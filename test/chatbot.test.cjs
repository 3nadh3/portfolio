const {test}=require('node:test');
const assert=require('node:assert/strict');
const Module=require('node:module');
const {buildSync}=require('esbuild');
const {JSDOM}=require('jsdom');
const bootDOM=new JSDOM('<div></div>',{url:'https://portfolio.test'});
Object.assign(global,{window:bootDOM.window,document:bootDOM.window.document});
const React=require('react');
const {createRoot}=require('react-dom/client');
const {act}=React;
const code=buildSync({entryPoints:['src/components/Chatbot.tsx'],bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],write:false,jsx:'automatic'}).outputFiles[0].text;
const mod=new Module(__filename);mod.paths=module.paths;mod._compile(code,__filename);
const Chatbot=mod.exports.default;

async function setup() {
  const dom=new JSDOM('<div id="root"></div>',{url:'https://portfolio.test'});
  Object.assign(global,{window:dom.window,document:dom.window.document,sessionStorage:dom.window.sessionStorage,IS_REACT_ACT_ENVIRONMENT:true});
  const requests=[];
  global.fetch=(_,options)=>new Promise((resolve,reject)=>{
    requests.push({body:JSON.parse(options.body),resolve:(data,status=200)=>resolve({ok:status<400,status,json:async()=>data})});
    options.signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true});
  });
  const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(React.createElement(Chatbot)));
  async function click(selector) {await act(async()=>document.querySelector(selector).click())}
  async function send(question) {
    const input=document.querySelector('input');
    await act(async()=>{
      Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(input,question);
      input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    });
    await act(async()=>document.querySelector('form').dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})));
  }
  await click('.chat-launcher');
  return {dom,requests,click,send,dispose:async()=>{await act(async()=>root.unmount());dom.window.close()}};
}

test('Stop restores a question, ignores its failed turn, and allows a successful retry',async()=>{
  const ui=await setup();
  try {
    await ui.send('Tell me about CyberGuard');
    assert.equal(ui.requests.length,1);
    assert.ok(document.querySelector('.chat-activity'));
    await act(async()=>document.querySelector('form').dispatchEvent(new ui.dom.window.Event('submit',{bubbles:true,cancelable:true})));
    assert.equal(ui.requests.length,1,'duplicate submissions must not consume quota');
    await ui.click('.chat-wait-controls button');
    assert.equal(document.querySelector('.chat-activity'),null);
    assert.equal(document.querySelector('input').value,'Tell me about CyberGuard');
    assert.match(document.querySelector('.notice').textContent,/Paused/);
    await ui.send('Tell me about CyberGuard');
    assert.deepEqual(ui.requests[1].body.history,[]);
    await act(async()=>ui.requests[1].resolve({message:'A phishing detective for your inbox.',suggestions:['How does it explain a prediction?']}));
    assert.equal(document.querySelector('.chat-activity'),null);
    assert.match(document.querySelector('.chat-log').textContent,/phishing detective/);
    await ui.click('.chat-follow-ups button');
    assert.equal(ui.requests[2].body.input,'How does it explain a prediction?');
    assert.equal(ui.requests[2].body.history.length,2);
    assert.ok(ui.requests[2].body.history.every(m=>!m.content.includes('Paused')));
    await ui.click('.chat-wait-controls button');
    await ui.click('[aria-label="New chat"]');
    assert.equal(document.querySelectorAll('.chat-turn').length,1);
    assert.equal(document.querySelector('.chat-follow-ups'),null);
  } finally {await ui.dispose()}
});

test('a timeout clears waiting, preserves the question, and permits another request',async()=>{
  const ui=await setup();const original=global.setTimeout;let expire;
  global.setTimeout=(fn,ms,...args)=>ms===60000?(expire=fn,987654):original(fn,ms,...args);
  try {
    await ui.send('What is his research?');
    assert.equal(typeof expire,'function');
    await act(async()=>expire());
    assert.equal(document.querySelector('.chat-activity'),null);
    assert.match(document.querySelector('.notice').textContent,/took too long/);
    assert.equal(document.querySelector('input').value,'What is his research?');
    await ui.send('What is his research?');
    assert.equal(ui.requests.length,2);
    assert.deepEqual(ui.requests[1].body.history,[]);
    await ui.click('.chat-wait-controls button');
  } finally {global.setTimeout=original;await ui.dispose()}
});

test('provider daily quota errors stop the animation and remain outside model history',async()=>{
  const ui=await setup();
  try {
    await ui.send('Hello');
    await act(async()=>ui.requests[0].resolve({code:'PROVIDER_DAILY_QUOTA_EXHAUSTED'},429));
    assert.equal(document.querySelector('.chat-activity'),null);
    assert.match(document.querySelector('.notice').textContent,/daily AI allowance/);
    assert.equal(document.querySelector('input').value,'Hello');
    assert.equal(document.querySelector('.chat-follow-ups'),null);
  } finally {await ui.dispose()}
});
