import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { validateDirectory, validateEvidence, scanText, validateWorkflow, releaseIssues, parseRpc, checkToolList, scanHistory } from '../tools/validate-library.mjs';

// Synthetic hostile inputs are assembled here, never actual credentials.
const fakeToken = ['gh', 'p_', 'A'.repeat(36)].join('');
const workflow = {on:{push:{},pull_request:{}},permissions:{contents:'read'},jobs:{check:{'runs-on':'ubuntu-latest',steps:[{uses:'actions/checkout@'+'1'.repeat(40),with:{'persist-credentials':false}},{run:'npm ci --ignore-scripts && npm test'}]}}};
const template = {schema_version:1,synthetic:false,source_commit:null,environment:null,executed_at:null,checks:[{id:'A',status:'NOT_TESTED',command:null,exit_code:null,artifact:null}],review:{status:'NOT_TESTED'},release_decision:'BLOCKED',limitations:['No execution.']};
function fixture(t) {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'pip-fixture-'));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const files={'README.md':'# Fixture\n\n[Notice](NOTICE.md)\n','NOTICE.md':'# Attribution\n\nOriginal synthetic fixture.\n','LICENSE':'Private candidate.\n','skills/demo/SKILL.md':'---\nname: demo\ndescription: "Use when planning a synthetic example."\n---\n\n# Demo\n\nDraft only.\n','example.json':'{}\n','example.yml':'key: value\n'};
 for(const [p,c] of Object.entries(files)){fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),c);}
 const entries=Object.keys(files).concat('export-policy.json','MANIFEST.sha256').sort().map(p=>({path:p,origin:'PIP_ORIGINAL',license:'PENDING',sensitivity:'PUBLIC_CANDIDATE'}));
 fs.writeFileSync(path.join(root,'export-policy.json'),JSON.stringify({version:1,files:entries}));
 return root;
}
function hashes(root){
 const policy=JSON.parse(fs.readFileSync(path.join(root,'export-policy.json')));
 const lines=policy.files.filter(x=>x.path!=='MANIFEST.sha256' && fs.existsSync(path.join(root,x.path))).map(x=>createHash('sha256').update(fs.readFileSync(path.join(root,x.path))).digest('hex')+'  '+x.path);
 fs.writeFileSync(path.join(root,'MANIFEST.sha256'),lines.join('\n')+'\n');
}
function has(issues, code){assert.ok(issues.some(x=>x.code===code),`Expected ${code}; got ${JSON.stringify(issues)}`);}
function gitAt(cwd,...args){
 return execFileSync('git',args,{cwd,encoding:'utf8',stdio:['pipe','pipe','pipe'],env:{...process.env,GIT_AUTHOR_NAME:'Synthetic',GIT_COMMITTER_NAME:'Synthetic',GIT_AUTHOR_EMAIL:'synthetic@example.invalid',GIT_COMMITTER_EMAIL:'synthetic@example.invalid'}});
}
function linkedFixture(t){
 const r=fixture(t);
 fs.copyFileSync(new URL('../.gitattributes',import.meta.url),path.join(r,'.gitattributes'));
 const policy=JSON.parse(fs.readFileSync(path.join(r,'export-policy.json')));
 policy.files.push({path:'.gitattributes',origin:'PIP_ORIGINAL',license:'MIT',sensitivity:'PUBLIC_CANDIDATE'});
 fs.writeFileSync(path.join(r,'export-policy.json'),JSON.stringify(policy));
 hashes(r);gitAt(r,'init','-q');gitAt(r,'add','.');gitAt(r,'-c','commit.gpgsign=false','commit','-qm','Synthetic worktree fixture');
 const linked=r+'-linked';t.after(()=>fs.rmSync(linked,{recursive:true,force:true}));gitAt(r,'worktree','add','--detach',linked,'HEAD');return linked;
}
test('registered linked worktree validates without exporting its Git pointer',t=>{
 assert.deepEqual(validateDirectory(linkedFixture(t)),[]);
});
test('arbitrary Git pointer is not an export exemption',t=>{
 const r=fixture(t);hashes(r);fs.writeFileSync(path.join(r,'.git'),'gitdir: ../missing\n');has(validateDirectory(r),'UNLISTED');
});
test('Git pointer with extra payload is not an export exemption',t=>{
 const r=linkedFixture(t);fs.appendFileSync(path.join(r,'.git'),'unreviewed payload\n');has(validateDirectory(r),'UNLISTED');
});
test('Git pointer copied from another worktree is not exempt',t=>{
 const linked=linkedFixture(t),r=fixture(t);hashes(r);fs.copyFileSync(path.join(linked,'.git'),path.join(r,'.git'));has(validateDirectory(r),'UNLISTED');
});
test('nested Git pointer is still rejected as unlisted content',t=>{
 const r=fixture(t);hashes(r);fs.mkdirSync(path.join(r,'nested'));fs.writeFileSync(path.join(r,'nested/.git'),'gitdir: ../missing\n');has(validateDirectory(r),'UNLISTED');
});
test('checkout preserves reviewed LF bytes even with autocrlf enabled',t=>{
 const r=fs.mkdtempSync(path.join(os.tmpdir(),'pip-eol-')),clone=r+'-clone';t.after(()=>{fs.rmSync(r,{recursive:true,force:true});fs.rmSync(clone,{recursive:true,force:true});});
 fs.writeFileSync(path.join(r,'README.md'),'Reviewed bytes.\nSecond line.\n');
 const attributes=new URL('../.gitattributes',import.meta.url);if(fs.existsSync(attributes))fs.copyFileSync(attributes,path.join(r,'.gitattributes'));
 gitAt(r,'init','-q');gitAt(r,'-c','core.autocrlf=false','add','.');gitAt(r,'-c','commit.gpgsign=false','commit','-qm','Synthetic checkout fixture');
 gitAt(r,'clone','-q','--no-local','-c','core.autocrlf=true',r,clone);
 assert.equal(fs.readFileSync(path.join(clone,'README.md'),'utf8'),'Reviewed bytes.\nSecond line.\n');
});
test('valid reviewed text tree passes offline structure checks',t=>{const r=fixture(t);hashes(r);assert.deepEqual(validateDirectory(r),[]);});
test('unlisted hidden file blocks export',t=>{const r=fixture(t);hashes(r);fs.writeFileSync(path.join(r,'.hidden'),'x');has(validateDirectory(r),'UNLISTED');});
test('missing mandatory notice blocks export',t=>{const r=fixture(t);fs.unlinkSync(path.join(r,'NOTICE.md'));hashes(r);has(validateDirectory(r),'MISSING');});
for(const name of ['link','.git'])test(`directory link ${name} is rejected without following it`,t=>{
 const r=fixture(t),outside=fs.mkdtempSync(path.join(os.tmpdir(),'pip-link-target-'));t.after(()=>fs.rmSync(outside,{recursive:true,force:true}));hashes(r);
 fs.writeFileSync(path.join(outside,'sentinel.txt'),fakeToken);
 fs.symlinkSync(outside,path.join(r,name),process.platform==='win32'?'junction':'dir');
 const issues=validateDirectory(r);has(issues,'SYMLINK');assert.equal(issues.some(e=>e.code==='SENSITIVE'),false);
 assert.equal(fs.readFileSync(path.join(outside,'sentinel.txt'),'utf8'),fakeToken);
});
test('changed bytes fail manifest validation',t=>{const r=fixture(t);hashes(r);fs.appendFileSync(path.join(r,'README.md'),'Change\n');has(validateDirectory(r),'HASH');});
test('invalid UTF-8 is rejected even in a listed file',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'README.md'),Buffer.from([0xff,0xfe]));hashes(r);has(validateDirectory(r),'TEXT');});
test('binary NUL in listed content is rejected',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'README.md'),'text\0payload');hashes(r);has(validateDirectory(r),'TEXT');});
test('missing skill frontmatter is rejected',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'skills/demo/SKILL.md'),'# Missing metadata\n');hashes(r);has(validateDirectory(r),'FRONTMATTER');});
test('skill name must match its directory',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'skills/demo/SKILL.md'),'---\nname: other\ndescription: "Use when testing."\n---\n\n# Other\n');hashes(r);has(validateDirectory(r),'FRONTMATTER');});
test('malformed JSON fails instead of being ignored',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'example.json'),'{bad');hashes(r);has(validateDirectory(r),'SYNTAX');});
test('duplicate YAML keys fail',t=>{const r=fixture(t);fs.writeFileSync(path.join(r,'example.yml'),'x: 1\nx: 2\n');hashes(r);has(validateDirectory(r),'SYNTAX');});
test('broken relative Markdown target fails',t=>{const r=fixture(t);fs.appendFileSync(path.join(r,'README.md'),'\n[missing](missing.md)\n');hashes(r);has(validateDirectory(r),'LINK');});
test('Markdown path cannot leave the approved export',t=>{const r=fixture(t);fs.appendFileSync(path.join(r,'README.md'),'\n[escape](../external.md)\n');hashes(r);has(validateDirectory(r),'LINK');});
test('broken heading fragment fails',t=>{const r=fixture(t);fs.appendFileSync(path.join(r,'README.md'),'\n[bad](NOTICE.md#absent)\n');hashes(r);has(validateDirectory(r),'LINK');});
test('known token patterns are rejected',()=>has(scanText(fakeToken),'SENSITIVE'));
test('credentials embedded in URLs are rejected',()=>has(scanText(['ht','tps://','user',':','pass','@','host.example/path'].join('')),'SENSITIVE'));
test('signed query links are rejected',()=>has(scanText('https://files.example/file?'+'X-Amz-Signature=abcd'),'SENSITIVE'));
test('private IP endpoints are rejected',()=>has(scanText('http://'+'10.1.2.3/internal'),'SENSITIVE'));
test('private source repository references are rejected',()=>has(scanText('pauloposteral/'+'pip-'+'dreams-into-making'),'SENSITIVE'));
test('plain base64 wrapping a token is detected',()=>has(scanText(Buffer.from(fakeToken).toString('base64')),'SENSITIVE'));
test('public URL and hashes are not flagged as secrets',()=>assert.deepEqual(scanText('https://mypip.site/mcp '+'a'.repeat(64)),[]));
test('public tool list rejects unexpected technical capabilities',()=>has(checkToolList([{name:'get_faq'},{name:'list_proposed_plans'},{name:'get_join_status'},{name:'execute_'+'project'}]),'TOOLS'));
test('public tool list must be complete with no duplicates',()=>has(checkToolList([{name:'get_faq'},{name:'get_faq'},{name:'get_join_status'}]),'TOOLS'));
test('approved tool names pass',()=>assert.deepEqual(checkToolList(['get_faq','list_proposed_plans','get_join_status'].map(name=>({name}))),[]));
test('read-only pinned workflow passes',()=>assert.deepEqual(validateWorkflow(workflow),[]));
test('privileged PR trigger is rejected',()=>has(validateWorkflow({...workflow,on:{['pull_'+'request_target']:{}}}),'WORKFLOW'));
test('write token permissions are rejected',()=>has(validateWorkflow({...workflow,permissions:{contents:'write'}}),'WORKFLOW'));
test('job-level permission override is rejected',()=>has(validateWorkflow({...workflow,jobs:{check:{...workflow.jobs.check,permissions:{contents:'write'}}}}),'WORKFLOW'));
test('unpinned action is rejected',()=>has(validateWorkflow({...workflow,jobs:{check:{...workflow.jobs.check,steps:[{uses:'actions/checkout@v4'}]}}}),'WORKFLOW'));
test('workflow secrets are rejected',()=>has(validateWorkflow({...workflow,jobs:{check:{...workflow.jobs.check,env:{KEY:'${{ '+'secrets.KEY }}'}}}}),'WORKFLOW'));
test('untested manifest has no fabricated receipt',()=>assert.deepEqual(validateEvidence(template),[]));
test('PASS without actual execution metadata is rejected',()=>has(validateEvidence({...template,checks:[{id:'A',status:'PASS',exit_code:0}]}),'EVIDENCE'));
test('synthetic report cannot authorize a real release',()=>has(validateEvidence({...template,synthetic:true,release_decision:'APPROVED'}),'EVIDENCE'));
test('untested check cannot have a passing exit code',()=>has(validateEvidence({...template,checks:[{id:'A',status:'NOT_TESTED',exit_code:0}]}),'EVIDENCE'));
test('unknown check status is rejected',()=>has(validateEvidence({...template,checks:[{id:'A',status:'MAYBE'}]}),'EVIDENCE'));
test('release remains blocked without license and reviews',()=>has(releaseIssues({license:{approved:false},independent_review:{status:'NOT_RUN'},ci:{status:'NOT_RUN'}},'UNLICENSED','Private candidate'),'RELEASE'));
test('release cannot pass while provider-generated Git metadata is blocked',()=>{
 const status={license:{approved:true,approval_reference:'owner decision'},independent_review:{status:'PASS',reference:'review receipt'},ci:{status:'PASS',reference:'CI receipt'},client_compatibility:{status:'VERIFIED'},commercial_features_enabled:false,spending_enabled:false,git_metadata:{status:'BLOCKED',reference:'metadata receipt'},repository_scope:{status:'VERIFIED',reference:'all exposed refs reviewed'}};
 has(releaseIssues(status,'MIT','MIT License\nStandard grant'),'RELEASE');
 delete status.git_metadata;
 has(releaseIssues(status,'MIT','MIT License\nStandard grant'),'RELEASE');
 status.git_metadata={status:'VERIFIED',reference:'all exposed refs inspected'};
 assert.deepEqual(releaseIssues(status,'MIT','MIT License\nStandard grant'),[]);
});
const reviewedRelease={license:{approved:true,approval_reference:'owner decision'},independent_review:{status:'PASS',reference:'review receipt'},ci:{status:'PASS',reference:'CI receipt'},client_compatibility:{status:'VERIFIED'},commercial_features_enabled:false,spending_enabled:false,git_metadata:{status:'VERIFIED',reference:'metadata receipt'}};
for(const [name,scope] of [
 ['missing',undefined],
 ['blocked',{status:'BLOCKED',reference:'docs/security-review.md'}],
 ['verified without a receipt',{status:'VERIFIED'}],
 ['verified with a blank receipt',{status:'VERIFIED',reference:'   '}],
 ['verified with a non-text receipt',{status:'VERIFIED',reference:true}],
])test(`release rejects ${name} repository scope`,()=>{
 const status={...reviewedRelease};if(scope!==undefined)status.repository_scope=scope;
 const issues=releaseIssues(status,'MIT','MIT License\nStandard grant');
 assert.ok(issues.some(x=>x.code==='RELEASE'&&x.message.includes('Repository-wide export review')),JSON.stringify(issues));
});
test('release accepts reviewed repository scope when every gate passes',()=>{
 const status={...reviewedRelease,repository_scope:{status:'VERIFIED',reference:'docs/security-review.md'}};
 assert.deepEqual(releaseIssues(status,'MIT','MIT License\nStandard grant'),[]);
});
test('JSON RPC result is parsed by request identity',()=>assert.deepEqual(parseRpc('{"jsonrpc":"2.0","id":7,"result":{"ok":true}}','application/json',7),{ok:true}));
test('SSE RPC result is parsed with heartbeat and CRLF',()=>assert.deepEqual(parseRpc(': ping\r\n\r\nevent: message\r\ndata: {"jsonrpc":"2.0","id":7,"result":{"ok":true}}\r\n\r\n','text/event-stream',7),{ok:true}));
test('JSON RPC error cannot become success',()=>assert.throws(()=>parseRpc('{"jsonrpc":"2.0","id":7,"error":{"code":-1,"message":"denied"}}','application/json',7)));
test('wrong RPC response id cannot become success',()=>assert.throws(()=>parseRpc('{"jsonrpc":"2.0","id":8,"result":{}}','application/json',7)));

test('portable config cannot hide another endpoint behind a second root key',t=>{
 const r=fixture(t),p='examples/mcp/portable.json';fs.mkdirSync(path.join(r,'examples/mcp'),{recursive:true});
 fs.writeFileSync(path.join(r,p),JSON.stringify({servers:{pip_publico:{type:'http',url:'https://mypip.site/mcp'}},mcpServers:{unapproved:{type:'http',url:'https://unapproved.example/mcp'}}}));
 const policy=JSON.parse(fs.readFileSync(path.join(r,'export-policy.json')));policy.files.push({path:p,origin:'PIP_ORIGINAL',license:'PENDING',sensitivity:'PUBLIC_CANDIDATE'});fs.writeFileSync(path.join(r,'export-policy.json'),JSON.stringify(policy));hashes(r);
 has(validateDirectory(r),'TOOLS');
});

test('Git history rejects private identifiers hidden in deleted historical paths',t=>{
 const r=fs.mkdtempSync(path.join(os.tmpdir(),'pip-history-'));t.after(()=>fs.rmSync(r,{recursive:true,force:true}));
 const git=(...args)=>execFileSync('git',args,{cwd:r,encoding:'utf8',env:{...process.env,GIT_AUTHOR_NAME:'Synthetic',GIT_COMMITTER_NAME:'Synthetic',GIT_AUTHOR_EMAIL:'synthetic@example.invalid',GIT_COMMITTER_EMAIL:'synthetic@example.invalid'}});
 git('init','-q');const secretPath='pip-'+'dreams-into-making.txt';fs.writeFileSync(path.join(r,secretPath),'Benign synthetic text.\n');git('add','.');git('-c','commit.gpgsign=false','commit','-qm','Synthetic path fixture');
 fs.unlinkSync(path.join(r,secretPath));git('add','-u');git('-c','commit.gpgsign=false','commit','-qm','Remove fixture');
 has(scanHistory(r).issues,'SENSITIVE');
});
