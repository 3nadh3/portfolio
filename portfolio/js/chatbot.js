// Restores the original portfolio chatbot backend and request/response contract.
const chatPanel=document.getElementById('chatbot-container');
const chatLauncher=document.getElementById('chatbot-icon');
const chatInput=document.getElementById('chatbot-input');
const chatSend=document.getElementById('chat-button');
const chatMessages=document.getElementById('chatbot-messages');
let chatPending=false;
function fitChat(){if(!chatPanel.hidden&&matchMedia('(max-width:600px)').matches&&window.visualViewport){chatPanel.style.height=window.visualViewport.height+'px';chatPanel.style.top=window.visualViewport.offsetTop+'px';}else{chatPanel.style.height='';chatPanel.style.top='';}}
function toggleChat(open){chatPanel.hidden=!open;chatLauncher.setAttribute('aria-expanded',String(open));document.body.classList.toggle('chat-open',open&&matchMedia('(max-width:600px)').matches);fitChat();if(open)chatInput.focus();else chatLauncher.focus();}
chatLauncher.addEventListener('click',()=>toggleChat(chatPanel.hidden));
document.getElementById('close-chatbot').addEventListener('click',()=>toggleChat(false));
chatPanel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();toggleChat(false);}});
window.addEventListener('resize',fitChat);
if(window.visualViewport){window.visualViewport.addEventListener('resize',fitChat);window.visualViewport.addEventListener('scroll',fitChat);}
function addChatMessage(text,kind){const message=document.createElement('div');message.className='chatbot-message '+kind;message.textContent=text;chatMessages.append(message);chatMessages.scrollTop=chatMessages.scrollHeight;return message;}
async function sendMessage(){
 const message=chatInput.value.trim();if(!message||chatPending)return;
 chatPending=true;addChatMessage(message,'user-message');chatInput.value='';chatInput.disabled=true;chatSend.disabled=true;
 document.querySelectorAll('[data-question]').forEach(button=>button.disabled=true);
 const loading=addChatMessage('','bot-message loading');loading.setAttribute('role','status');loading.setAttribute('aria-label','Assistant is typing');loading.innerHTML='<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
 const slowTimer=setTimeout(()=>{if(loading.isConnected){const note=document.createElement('div');note.className='typing-note';note.textContent='Waking up the assistant — the first reply can take a moment…';loading.append(note);}},6000);
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),90000);
 try{
  const response=await fetch('https://portfolio-chatbot-ozkz.onrender.com/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({input:message}),signal:controller.signal});
  if(!response.ok)throw Error('Chat request failed');
  const data=await response.json();if(typeof data.message!=='string'||!data.message.trim())throw Error('Invalid assistant response');
  addChatMessage(data.message,'bot-message');
 }catch(error){addChatMessage(error.name==='AbortError'?'The assistant is taking longer than expected. Please try again.':'The assistant could not reply right now. Please try again.','bot-message');}
 finally{
  clearTimeout(slowTimer);clearTimeout(timeout);loading.remove();chatPending=false;chatInput.disabled=false;chatSend.disabled=false;
  document.querySelectorAll('[data-question]').forEach(button=>button.disabled=false);
  if(!chatPanel.hidden)chatInput.focus();chatMessages.scrollTop=chatMessages.scrollHeight;
 }
}
document.getElementById('chatbot-form').addEventListener('submit',event=>{event.preventDefault();sendMessage();});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{chatInput.value=button.dataset.question;sendMessage();}));
