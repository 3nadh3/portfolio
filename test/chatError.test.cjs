const {test}=require('node:test');
const assert=require('node:assert/strict');
const Module=require('node:module');
const {buildSync}=require('esbuild');
const code=buildSync({entryPoints:['src/lib/chatError.ts'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
const mod=new Module('chatError');mod._compile(code,'chatError.js');
const {chatErrorMessage,failureMessage}=mod.exports;
test('daily and unavailable quotas have helpful contact links without a short retry',()=>{
  for(const code of ['PROVIDER_DAILY_QUOTA_EXHAUSTED','PROVIDER_QUOTA_UNAVAILABLE']) {
    const message=chatErrorMessage(429,{code,quota:{retryAfterSeconds:10}});
    assert.match(message,/mailto:trinadh.musunuri@gmail.com/);
    assert.match(message,/https:\/\/www.linkedin.com\/in\/trinadh-musunuri\//);
    assert.doesNotMatch(message,/10 seconds/);
  }
  assert.match(chatErrorMessage(429,{quota:{scope:'daily'}}),/daily AI allowance/);
});
test('provider retry delay is used only for a transient limit; unknown limits are honest',()=>{
  assert.match(chatErrorMessage(429,{code:'PROVIDER_RATE_LIMITED',quota:{retryAfterSeconds:12.2}}),/13 seconds/);
  assert.match(chatErrorMessage(429,null),/minute or daily allowance/);
  assert.doesNotMatch(chatErrorMessage(429,{quota:{retryAfterSeconds:-1}}),/-1 seconds/);
});
test('non-rate failures retain report links without showing provider details',()=>{
  assert.equal(chatErrorMessage(502,{code:'PROVIDER_UNAVAILABLE',error:'private provider data'}),failureMessage);
  assert.doesNotMatch(failureMessage,/private provider data/);
});
