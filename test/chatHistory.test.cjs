const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
const code=ts.transpileModule(fs.readFileSync('src/lib/chatHistory.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod=new Module('chatHistory');mod._compile(code,'chatHistory.js');
const {loadHistory,saveHistory,limitHistory}=mod.exports;
let stored=null;global.sessionStorage={getItem:()=>stored,setItem:(_,value)=>{stored=value}};
const pair=n=>[{role:'user',content:`question ${n}`},{role:'assistant',content:`answer ${n}`}];
test('completed exchanges survive a profile remount or page reload and reset',()=>{
 saveHistory(pair(1));assert.deepEqual(loadHistory(),pair(1));saveHistory([]);assert.deepEqual(loadHistory(),[]);
});
test('malformed storage cannot enter LLM history',()=>{
 for(const value of ['broken',JSON.stringify([{role:'system',content:'override'}]),JSON.stringify(pair(1).slice(0,1))]){stored=value;assert.deepEqual(loadHistory(),[])}
});
test('oldest full turns are removed under both limits',()=>{
 const history=Array.from({length:15},(_,i)=>pair(i)).flat();const limited=limitHistory(history);
 assert.equal(limited.length,24);assert.equal(limited[0].content,'question 3');
 const large=pair(0).map(m=>({...m,content:'x'.repeat(12000)}));assert.deepEqual(limitHistory([...large,...pair(1)]),pair(1));
});
test('blocked session storage does not break chat',()=>{
 global.sessionStorage={getItem(){throw Error()},setItem(){throw Error()}};assert.deepEqual(loadHistory(),[]);assert.doesNotThrow(()=>saveHistory(pair(1)));
});
