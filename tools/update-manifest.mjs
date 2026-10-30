import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Explicit allowlist only. This command never discovers or approves new files.
const root=process.cwd(),policy=JSON.parse(fs.readFileSync('export-policy.json','utf8'));
const lines=[];
for(const entry of policy.files){
 if(entry.path==='MANIFEST.sha256')continue;
 const target=path.resolve(root,entry.path);
 if(!target.startsWith(root+path.sep)||entry.path.includes('\\')||entry.path.split('/').includes('..'))throw Error('Unsafe path.');
 let parent=target;
 while(parent!==root){if(fs.lstatSync(parent).isSymbolicLink())throw Error('Symlink rejected.');parent=path.dirname(parent);}
 if(!fs.statSync(target).isFile())throw Error('Regular file required.');
 lines.push(createHash('sha256').update(fs.readFileSync(target)).digest('hex')+'  '+entry.path);
}
fs.writeFileSync('MANIFEST.sha256',lines.sort((a,b)=>a.slice(66).localeCompare(b.slice(66))).join('\n')+'\n');
console.log(`Hashed ${lines.length} pre-approved paths; manifest excludes its own hash.`);
