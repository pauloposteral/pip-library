import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import YAML from 'yaml';
import MarkdownIt from 'markdown-it';
import { parse as parseToml } from 'smol-toml';

export const PUBLIC_URL = 'https://mypip.site/mcp';
export const PUBLIC_TOOLS = ['get_faq','list_proposed_plans','get_join_status'];
const md = new MarkdownIt({html:false});
const issue = (code,message) => ({code,message});
const hash = data => createHash('sha256').update(data).digest('hex');
const inside = (root,target) => target === root || target.startsWith(root + path.sep);

export function scanText(text) {
 const patterns = [
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}/,
  /AKIA[A-Z0-9]{16}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /https?:\/\/[^\s/]+:[^\s/]+@/i,
  /[?&](?:x-amz-signature|x-goog-signature|sig|access_token|api_key|token)=/i,
  /https?:\/\/(?:localhost|127\.|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|100\.(?:6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|\[::1\])/i,
  /https?:\/\/[^\s/]+\.(?:internal|local|ts\.net)(?:\/|\b)/i,
  /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
 ];
 const privateRefs=['pip-'+'dreams-into-making','/workspace/'+'scratch/','/root/'+'.ssh/'];
 const candidates=[text];
 for(const match of text.matchAll(/[A-Za-z0-9+/]{40,}={0,2}/g)) {
  if(match[0].length<4096) candidates.push(Buffer.from(match[0],'base64').toString('utf8'));
 }
 return candidates.some(v=>patterns.some(p=>p.test(v))||privateRefs.some(s=>v.includes(s))) ? [issue('SENSITIVE','Potential credential, private reference, endpoint or signed link; inspect without printing the value.')] : [];
}

export function checkToolList(tools) {
 const names=Array.isArray(tools)?tools.map(t=>t?.name).sort():[];
 return JSON.stringify(names)===JSON.stringify([...PUBLIC_TOOLS].sort())?[]:[issue('TOOLS','Public discovery must contain exactly the three approved information tools.')];
}

export function validateEvidence(data) {
 const errors=[]; const bad=msg=>errors.push(issue('EVIDENCE',msg));
 if(data?.schema_version!==1||typeof data.synthetic!=='boolean'||!Array.isArray(data.checks)||!data.checks.length){bad('Invalid evidence envelope.');return errors;}
 const allowed=['PASS','FAIL','BLOCKED','NOT_TESTED','UNVERIFIED'];
 if(!['BLOCKED','UNVERIFIED','APPROVED','REJECTED'].includes(data.release_decision))bad('Invalid release decision.');
 if(data.synthetic&&data.release_decision==='APPROVED')bad('Synthetic evidence cannot approve a release.');
 for(const c of data.checks){
  if(!c.id||!allowed.includes(c.status))bad('Invalid check id or status.');
  if(['NOT_TESTED','BLOCKED','UNVERIFIED'].includes(c.status)&&c.exit_code!=null)bad('Unexecuted or unverified check has a fabricated exit code.');
  if(['PASS','FAIL'].includes(c.status)){
   if(typeof c.command!=='string'||!c.command.trim()||!Number.isInteger(c.exit_code))bad('Executed check needs command and integer exit code.');
   if(c.status==='PASS'&&c.exit_code!==0)bad('PASS requires zero exit code.');
   if(!data.synthetic&&(!/^[a-f0-9]{40}$/.test(data.source_commit||'')||!data.environment||!data.executed_at||!Number.isFinite(Date.parse(data.executed_at))||!/^[a-f0-9]{64}$/.test(c.artifact?.sha256||'')))bad('Real execution needs source commit, environment, timestamp and artifact hash.');
  }
 }
 if(data.release_decision==='APPROVED'&&(data.checks.some(c=>c.status!=='PASS')||data.review?.status!=='PASS'))bad('Release approval requires passing checks and review.');
 return errors;
}

export function validateWorkflow(w) {
 const errors=[];const bad=msg=>errors.push(issue('WORKFLOW',msg));
 if(!w||typeof w!=='object'){bad('Workflow must be an object.');return errors;}
 const events=typeof w.on==='string'?[w.on]:Array.isArray(w.on)?w.on:Object.keys(w.on||{});
 if(!events.length||events.some(x=>!['push','pull_request','workflow_dispatch'].includes(x)))bad('Only push, pull_request and manual events are allowed.');
 if(JSON.stringify(w.permissions)!==JSON.stringify({contents:'read'}))bad('Top-level permissions must be contents: read only.');
 if(/\bsecrets\s*(?:\.|\[)/.test(JSON.stringify(w)))bad('Workflow must not access secrets.');
 if(!w.jobs||typeof w.jobs!=='object')bad('Workflow has no jobs.');
 for(const j of Object.values(w.jobs||{})){
  if(j.permissions&&JSON.stringify(j.permissions)!==JSON.stringify({contents:'read'}))bad('Job cannot expand token permissions.');
  if(j['runs-on']!=='ubuntu-latest')bad('Only the isolated GitHub-hosted Ubuntu runner is allowed.');
  if(j.environment||j.services||j.container||j.uses)bad('No environments, services, containers or reusable workflow delegation.');
  for(const s of j.steps||[]){
   if(s.uses&&!/^actions\/(checkout|setup-node)@[a-f0-9]{40}$/.test(s.uses))bad('Actions must be approved first-party actions pinned by full commit.');
   if(s.uses?.startsWith('actions/checkout@')&&(s.with?.['persist-credentials']!==false||s.with?.ref||s.with?.repository))bad('Checkout must not persist credentials or override repository/ref.');
   if(s.run&&/curl.+\|\s*(?:sh|bash)|sudo\s|npm\s+(?:ci|install)(?![^\n]*--ignore-scripts)/.test(s.run))bad('Unsafe command or package install scripts in workflow.');
  }
 }
 return errors;
}

function headings(text){
 const tokens=md.parse(text,{}),seen=new Map(),anchors=new Set();
 for(let i=0;i<tokens.length;i++)if(tokens[i].type==='heading_open'){
  const plain=tokens[i+1].content.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
  const n=seen.get(plain)||0;seen.set(plain,n+1);anchors.add(n?plain+'-'+n:plain);
 }
 return anchors;
}

function markdownIssues(root,relative,text){
 const errors=[],tokens=md.parse(text,{});
 if((text.match(/^```/gm)||[]).length%2)errors.push(issue('MARKDOWN','Unclosed fenced code block.'));
 for(const t of tokens){
  for(const c of t.children||[]){
   if(c.type==='image'&&!c.content?.trim())errors.push(issue('MARKDOWN','Image needs descriptive alt text.'));
   if(!['link_open','image'].includes(c.type))continue;
   const href=c.attrGet(c.type==='image'?'src':'href'); if(!href)continue;
   if(/^[a-z][a-z\d+.-]*:/i.test(href)){
    if(!/^https:\/\//.test(href))errors.push(issue('LINK','Only HTTPS external documentation links are allowed.'));
    continue;
   }
   try {
    const [file,fragment]=href.split('#');
    const target=path.resolve(root,path.dirname(relative),decodeURIComponent(file||path.basename(relative)));
    if(!inside(root,target)||!fs.existsSync(target)||fs.lstatSync(target).isSymbolicLink())throw Error('Target absent, outside export or symlink.');
    if(fragment&&target.endsWith('.md')&&!headings(fs.readFileSync(target,'utf8')).has(decodeURIComponent(fragment)))throw Error('Heading does not exist.');
   }catch(e){errors.push(issue('LINK',`${href}: ${e.message}`));}
  }
 }
 return errors;
}

export function releaseIssues(status,licenseId,licenseText){
 const errors=[];const bad=msg=>errors.push(issue('RELEASE',msg));
 if(status?.license?.approved!==true||!status.license.approval_reference||licenseId!=='MIT'||!licenseText.startsWith('MIT License\n')||/APPROVAL PENDING|PROPOSAL ONLY/.test(licenseText))bad('Owner-approved original-content license is missing.');
 for(const key of ['independent_review','ci'])if(status?.[key]?.status!=='PASS'||!status[key].reference)bad(`${key} has not passed with a receipt.`);
 if(status?.client_compatibility?.status!=='VERIFIED')bad('Independent client compatibility remains incomplete.');
 if(status?.git_metadata?.status!=='VERIFIED'||!status.git_metadata.reference)bad('Git metadata privacy has not passed, including provider-generated PR refs.');
 if(status?.repository_scope?.status!=='VERIFIED'||typeof status.repository_scope.reference!=='string'||!status.repository_scope.reference.trim())bad('Repository-wide export review has not been verified with a receipt covering all exposed refs.');
 if(status?.commercial_features_enabled!==false||status?.spending_enabled!==false)bad('Commercial and spending gates must remain disabled.');
 return errors;
}

function registeredWorktreePointer(root,full){
 try{
  if(fs.statSync(full).size>4096)return false;
  const match=fs.readFileSync(full,'utf8').match(/^gitdir: ([^\r\n\0]+)\r?\n?$/);
  if(!match)return false;
  const gitdir=fs.realpathSync(path.resolve(root,match[1]));
  // Linked worktrees have a reciprocal pointer; an arbitrary .git file is content.
  const back=fs.readFileSync(path.join(gitdir,'gitdir'),'utf8').trim();
  if(fs.realpathSync(path.resolve(gitdir,back))!==fs.realpathSync(full))return false;
  const observed=execFileSync('git',['rev-parse','--show-toplevel','--absolute-git-dir'],{cwd:root,encoding:'utf8',timeout:3000,stdio:['ignore','pipe','ignore']}).trim().split(/\r?\n/);
  return observed.length===2&&fs.realpathSync(observed[0])===fs.realpathSync(root)&&fs.realpathSync(observed[1])===gitdir;
 }catch{return false;}
}

export function validateDirectory(input,{release=false}={}){
 const root=path.resolve(input), errors=[];const add=(p,list)=>errors.push(...list.map(e=>({...e,path:p})));
 let policy;try{policy=JSON.parse(fs.readFileSync(path.join(root,'export-policy.json'),'utf8'));}catch{ return [issue('POLICY','Missing or invalid export policy.')];}
 if(!Array.isArray(policy.files))return [issue('POLICY','File allowlist is required.')];
 const allow=new Set();
 for(const e of policy.files){
  if(typeof e.path!=='string'||e.path.startsWith('/')||e.path.split('/').includes('..')||e.path.includes('\\')||allow.has(e.path)){errors.push(issue('POLICY','Unsafe or duplicated allowlist path.'));continue;}
  allow.add(e.path);
  if(!['PIP_ORIGINAL','STANDARD_LICENSE_TEXT'].includes(e.origin)||!['PENDING','MIT'].includes(e.license)||e.sensitivity!=='PUBLIC_CANDIDATE')errors.push(issue('POLICY','Unreviewed provenance entry.'));
 }
 const found=[];
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const full=path.join(dir,e.name),rel=path.relative(root,full).split(path.sep).join('/');
  if(e.isSymbolicLink()){errors.push({...issue('SYMLINK','Symlink rejected.'),path:rel});continue;}
  if((rel==='.git'||rel==='node_modules')&&e.isDirectory())continue;
  if(rel==='.git'&&e.isFile()&&registeredWorktreePointer(root,full))continue;
  if(e.isDirectory())walk(full);else if(e.isFile())found.push(rel);else errors.push({...issue('TEXT','Non-regular file rejected.'),path:rel});
 }}
 walk(root);
 for(const p of found)if(!allow.has(p))errors.push({...issue('UNLISTED','File is not in reviewed allowlist.'),path:p});
 for(const p of new Set([...allow,'README.md','LICENSE','NOTICE.md','MANIFEST.sha256']))if(!found.includes(p))errors.push({...issue('MISSING','Required or allowlisted file is missing.'),path:p});
 let hashes=new Map();
 try{for(const l of fs.readFileSync(path.join(root,'MANIFEST.sha256'),'utf8').trim().split('\n')){
  const m=l.match(/^([a-f0-9]{64})  (.+)$/);if(!m||hashes.has(m[2]))throw Error('Invalid hash entry.');hashes.set(m[2],m[1]);
 }}catch{errors.push(issue('HASH','Missing or invalid manifest.'));}
 for(const p of hashes.keys())if(!allow.has(p)||p==='MANIFEST.sha256')errors.push(issue('HASH','Unexpected manifest entry.'));
 for(const p of found){
  const bytes=fs.readFileSync(path.join(root,p));
  if(p!=='MANIFEST.sha256'&&hashes.get(p)!==hash(bytes))errors.push({...issue('HASH','Content hash differs or is absent.'),path:p});
  if(bytes.length>512000||!(/\.(md|json|ya?ml|toml|mjs|txt)$/.test(p)||['LICENSE','MANIFEST.sha256','.gitignore','.gitattributes'].includes(p))){errors.push({...issue('TEXT','Unapproved type or oversized file.'),path:p});continue;}
  let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);if(text.includes('\0'))throw Error();}catch{errors.push({...issue('TEXT','Not safe UTF-8 text.'),path:p});continue;}
  add(p,scanText(text));
  try{
   let parsed;
   if(p.endsWith('.json'))parsed=JSON.parse(text);
   if(/\.ya?ml$/.test(p))parsed=YAML.parse(text,{uniqueKeys:true,maxAliasCount:0});
   if(p.endsWith('.toml'))parsed=parseToml(text);
   if(p.startsWith('.github/workflows/'))add(p,validateWorkflow(parsed));
   if(p==='templates/evidence-manifest.json'||p==='examples/qa/sample-report.json')add(p,validateEvidence(parsed));
   if(p.startsWith('examples/mcp/')&&/\.(json|toml)$/.test(p)){
    const rootKey=p.endsWith('/codex.toml')?'mcp_servers':p.endsWith('/portable.json')?'mcpServers':p.endsWith('/vscode.json')?'servers':null;
    const rootKeys=parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?Object.keys(parsed):[];
    if(!rootKey||rootKeys.length!==1||rootKeys[0]!==rootKey)add(p,[issue('TOOLS','MCP configuration must use the exact format for its filename; mixed roots are forbidden.')]);
    const servers=rootKey?parsed?.[rootKey]:null;
    if(!servers||Object.keys(servers).length!==1||servers.pip_publico?.url!==PUBLIC_URL||Object.keys(servers.pip_publico).some(k=>!['type','url','enabled_tools'].includes(k))||(servers.pip_publico.type&&servers.pip_publico.type!=='http'))add(p,[issue('TOOLS','MCP configuration must use only the approved public server.')]);
    if(servers?.pip_publico?.enabled_tools)add(p,checkToolList(servers.pip_publico.enabled_tools.map(name=>({name}))));
   }
   if(p.endsWith('SKILL.md')){
    const m=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if(!m)throw {frontmatter:true};
    const f=YAML.parse(m[1],{uniqueKeys:true,maxAliasCount:0});
    if(!f||Object.keys(f).some(k=>!['name','description'].includes(k))||typeof f.name!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.name)||f.name.length>64||f.name!==path.basename(path.dirname(p))||typeof f.description!=='string'||!f.description.trim()||f.description.length>1024||/[<>]/.test(f.description))throw {frontmatter:true};
   }
   if(p.endsWith('.md'))add(p,markdownIssues(root,p,text));
  }catch(e){add(p,[issue(e.frontmatter?'FRONTMATTER':'SYNTAX','Invalid structured content or skill metadata.')]);}
 }
 if(release){try{add('release-status.json',releaseIssues(JSON.parse(fs.readFileSync(path.join(root,'release-status.json'))),JSON.parse(fs.readFileSync(path.join(root,'package.json'))).license,fs.readFileSync(path.join(root,'LICENSE'),'utf8')));}catch{errors.push(issue('RELEASE','Missing release approval metadata.'));}}
 return errors;
}

export function parseRpc(text,contentType,id){
 const messages=contentType?.includes('text/event-stream')?text.replace(/\r\n/g,'\n').split('\n\n').map(event=>event.split('\n').filter(l=>l.startsWith('data:')).map(l=>l.slice(5).trimStart()).join('\n')).filter(Boolean).map(s=>JSON.parse(s)):[JSON.parse(text)];
 const response=messages.find(m=>m.jsonrpc==='2.0'&&m.id===id);
 if(!response||response.error||!Object.hasOwn(response,'result'))throw Error('Missing matching JSON-RPC result or server returned an error.');
 return response.result;
}

export function scanHistory(root){
 const errors=[];
 try{
  const commits=execFileSync('git',['rev-list','--all'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
  for(const commit of commits){
   const msg=execFileSync('git',['show','-s','--format=fuller',commit],{cwd:root,encoding:'utf8'});errors.push(...scanText(msg).map(e=>({...e,path:`commit:${commit}`})));
   const list=execFileSync('git',['ls-tree','-r',commit],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
   for(const line of list){const m=line.match(/^(\d+) blob ([a-f0-9]+)\t(.+)$/);if(!m){errors.push(issue('HISTORY','Unexpected tree object.'));continue;}
    const historicalPath=m[3];errors.push(...scanText(historicalPath).map(e=>({...e,path:`historical-path:${commit}`})));
    if(historicalPath.startsWith('"')||historicalPath.startsWith('/')||historicalPath.includes('\\')||historicalPath.split('/').includes('..')||historicalPath.split('/').some(s=>s==='node_modules'||s==='.git')||!(/\.(md|json|ya?ml|toml|mjs|txt)$/.test(historicalPath)||['LICENSE','MANIFEST.sha256','.gitignore','.gitattributes'].includes(historicalPath)))errors.push(issue('HISTORY','Unapproved historical path or file type.'));
    if(m[1]!=='100644')errors.push(issue('HISTORY','Unexpected historical file mode.'));
    const data=execFileSync('git',['cat-file','blob',m[2]],{cwd:root,maxBuffer:1024*1024});
    try{const text=new TextDecoder('utf-8',{fatal:true}).decode(data);if(text.includes('\0'))throw Error();errors.push(...scanText(text).map(e=>({...e,path:`${commit}:${m[3]}`})));}catch{errors.push(issue('HISTORY','Historical non-text content rejected.'));}
   }
  }
  return {commits:commits.length,issues:errors};
 }catch{return {commits:0,issues:[issue('HISTORY','Could not inspect complete history.')]};}
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const root=process.cwd();const errors=validateDirectory(root,{release:process.argv.includes('--release')});
 let history=null;if(process.argv.includes('--history')){history=scanHistory(root);errors.push(...history.issues);}
 console.log(JSON.stringify({status:errors.length?'FAIL':'PASS',files:JSON.parse(fs.readFileSync('export-policy.json')).files.length,history_commits:history?.commits??null,issues:errors},null,2));
 process.exitCode=errors.length?1:0;
}
