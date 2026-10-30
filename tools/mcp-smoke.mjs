import { createHash } from 'node:crypto';
import { PUBLIC_URL, PUBLIC_TOOLS, parseRpc, checkToolList } from './validate-library.mjs';

// Bounded, credential-free public legacy MCP probe. Never a general URL fetcher.
const receipt={schema_version:1,synthetic:false,observed_at:new Date().toISOString(),client:`Node ${process.version}`,endpoint:PUBLIC_URL,protocol:'2025-03-26',steps:[],status:'FAIL'};
const headers={'Content-Type':'application/json','Accept':'application/json, text/event-stream','MCP-Protocol-Version':'2025-03-26'};
let id=0;
async function request(method,params,notification=false){
 const body={jsonrpc:'2.0',method};if(!notification)body.id=++id;if(params!==undefined)body.params=params;
 const response=await fetch(PUBLIC_URL,{method:'POST',headers,body:JSON.stringify(body),redirect:'error',signal:AbortSignal.timeout(20000)});
 const reader=response.body?.getReader();let size=0;const chunks=[];
 if(reader)for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>262144){await reader.cancel();throw Error('Response exceeds safe size.');}chunks.push(Buffer.from(value));}
 const bytes=Buffer.concat(chunks),text=bytes.toString('utf8');
 const step={method,http_status:response.status,content_type:response.headers.get('content-type'),response_sha256:createHash('sha256').update(bytes).digest('hex')};receipt.steps.push(step);
 if(!response.ok)throw Error(`HTTP ${response.status}`);
 const session=response.headers.get('mcp-session-id');if(session)headers['Mcp-Session-Id']=session;
 if(notification)return;
 const result=parseRpc(text,step.content_type,id);
 if(result?.isError===true)throw Error('Tool returned an error.');
 return result;
}
try{
 const init=await request('initialize',{protocolVersion:receipt.protocol,capabilities:{},clientInfo:{name:'pip-library-smoke',version:'0.1.0'}});
 if(init.protocolVersion!==receipt.protocol||!init.capabilities?.tools)throw Error('Unsupported protocol or missing tool capability.');
 receipt.server_version=init.serverInfo?.version||null;
 await request('notifications/initialized',undefined,true);
 const list=await request('tools/list',{});
 if(checkToolList(list.tools).length||list.nextCursor)throw Error('Unexpected public tool catalog.');
 receipt.tools=list.tools.map(t=>({name:t.name,readOnlyHint:t.annotations?.readOnlyHint??null}));
 const faq=await request('tools/call',{name:'get_faq',arguments:{}});
 if(!Array.isArray(faq.content)||!faq.content.some(c=>c.type==='text'&&c.text?.trim()))throw Error('FAQ returned no usable text.');
 receipt.called_tool='get_faq';receipt.expected_tools=PUBLIC_TOOLS;receipt.status='PASS';
 receipt.limitations=['Raw HTTP legacy protocol only; not a Codex, Claude, Copilot or Lovable client test.','Other tools discovered but not invoked.','Response bodies and session identifiers are intentionally omitted from this public receipt.'];
}catch(e){receipt.error=e.message;process.exitCode=1;}
console.log(JSON.stringify(receipt,null,2));
