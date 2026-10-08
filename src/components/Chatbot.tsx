import {useState,useRef,useEffect,useLayoutEffect} from 'react';
import {MessageCircle,ArrowUp,X,ArrowUpRight,RotateCcw,Sparkles} from 'lucide-react';
import {loadHistory,saveHistory,limitHistory,type ChatTurn} from '../lib/chatHistory';
import ChatMarkdown from './ChatMarkdown';
import {chatErrorMessage,failureMessage} from '../lib/chatError';
import ChatActivity,{JamboAvatar} from './ChatActivity';

const greeting = {kind:'bot',text:"Hey, I'm **Jambo**.\n\nYour backstage pass to Trinadh's projects, ideas, and the stories behind the code. What are you curious about?"};
const SUGGESTIONS_KEY = 'trinadh-chat-suggestions-v1';
function validSuggestions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((q): q is string => typeof q === 'string' && !!q.trim() && q.trim().length <= 120).map(q=>q.trim()))].slice(0,3);
}
function storedSuggestions() {
  try { return loadHistory().length ? validSuggestions(JSON.parse(sessionStorage.getItem(SUGGESTIONS_KEY)||'[]')) : []; }
  catch { return []; }
}
function saveSuggestions(value: string[]) {
  try { sessionStorage.setItem(SUGGESTIONS_KEY,JSON.stringify(value)); } catch { /* Optional tab persistence. */ }
}

export default function Chatbot() {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState('');
  const [pending,setPending] = useState(false);
  const [messages,setMessages] = useState(()=>[greeting,...loadHistory().map(m=>({kind:m.role==='user'?'user':'bot',text:m.content}))]);
  const [suggestions,setSuggestions] = useState(storedSuggestions);
  const history = useRef<ChatTurn[]>(loadHistory());
  const activeRequest = useRef<AbortController|null>(null);
  const field = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const requestStarted = useRef(0);
  useEffect(()=>()=>{activeRequest.current?.abort('unmount')},[]);
  useEffect(()=>{if(open)field.current?.focus({preventScroll:true})},[open]);
  useLayoutEffect(()=>{if(open&&log.current)log.current.scrollTop=log.current.scrollHeight},[open,messages,pending,suggestions]);
  const close = () => {setOpen(false);launcher.current?.focus()};

  const newChat = () => {
    if(busy.current)return;
    history.current=[];
    saveHistory([]);
    saveSuggestions([]);
    setSuggestions([]);
    setMessages([greeting]);
    setInput('');
    field.current?.focus();
  };
  const send = async(text=input) => {
    const question=text.trim();
    if(!question||busy.current)return;
    busy.current=true;
    requestStarted.current=Date.now();
    setPending(true);
    setInput('');
    setSuggestions([]);
    saveSuggestions([]);
    setMessages(m=>[...m,{kind:'user',text:question}]);
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort('timeout'),60000);
    activeRequest.current=controller;
    let messageOnFailure=failureMessage;
    try {
      const res=await fetch('https://portfolio-chatbot-ozkz.onrender.com/chat',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({input:question,history:history.current}),signal:controller.signal
      });
      const data=await res.json().catch(()=>null);
      if(!res.ok) {
        messageOnFailure=chatErrorMessage(res.status,data);
        throw Error();
      }
      if(!data||typeof data.message!=='string'||!data.message.trim()||data.message==='error')throw Error();
      if(controller.signal.aborted)return;
      history.current=limitHistory([...history.current,{role:'user',content:question},{role:'assistant',content:data.message}]);
      saveHistory(history.current);
      const followUps=validSuggestions(data.suggestions);
      setSuggestions(followUps);
      saveSuggestions(followUps);
      setMessages(m=>[...m,{kind:'bot',text:data.message}]);
    } catch {
      if(controller.signal.reason==='unmount')return;
      if(controller.signal.aborted)messageOnFailure=controller.signal.reason==='timeout'
        ?"That reply took too long. The service may be waking up—your question is below, ready to try again."
        :"Paused. Your question is back in the box whenever you're ready.";
      setMessages(m=>[...m,{kind:'notice',text:messageOnFailure}]);
      setInput(current=>current||question);
    } finally {
      clearTimeout(timer);
      activeRequest.current=null;
      busy.current=false;
      if(controller.signal.reason==='unmount')return;
      setPending(false);
      field.current?.focus();
    }
  };
  return <>
    <button ref={launcher} className="chat-launcher" aria-expanded={open} aria-controls="chat-panel" onClick={()=>open?close():setOpen(true)}>
      <MessageCircle size={18}/><span>Chat with Jambo</span><span className="chat-launcher-spark" aria-hidden="true"><Sparkles size={13}/></span>
    </button>
    {open&&<section id="chat-panel" className="chat-panel" role="dialog" aria-label="Jambo, Trinadh's AI assistant" onKeyDown={e=>{if(e.key==='Escape')close()}}>
      <div className="chat-header">
        <div className="chat-identity"><JamboAvatar/><div><strong>Jambo<span>AI</span></strong><p>A curious little portfolio sidekick</p></div></div>
        <div className="chat-header-actions">
          <button type="button" disabled={pending} onClick={newChat} aria-label="New chat" title="New chat"><RotateCcw size={16}/></button>
          <button onClick={close} aria-label="Close assistant"><X size={19}/></button>
        </div>
      </div>
      <div ref={log} role="log" aria-label="Conversation" aria-live="polite" className="chat-log">
        {messages.map((m,i)=><div key={i} className={'chat-turn '+m.kind+(i===0?' chat-welcome':'')}>
          {m.kind==='bot'&&i>0&&<span className="chat-speaker">Jambo</span>}
          {i===0&&<div className="chat-welcome-mark" aria-hidden="true"><Sparkles size={19}/><span>GOOD QUESTIONS. REAL STORIES.</span></div>}
          <div className={'chat-message '+m.kind}>{m.kind==='user'?m.text:<ChatMarkdown text={m.text}/>}</div>
        </div>)}
        {pending&&<ChatActivity startedAt={requestStarted.current} onStop={()=>activeRequest.current?.abort('user')}/>}
        {!!suggestions.length&&!pending&&<div className="chat-follow-ups" aria-label="Suggested follow-up questions">
        <p>A little further down the rabbit hole</p>
        {suggestions.map(q=><button key={q} type="button" onClick={()=>send(q)}><span>{q}</span><ArrowUpRight size={14} aria-hidden="true"/></button>)}
      </div>}
      </div>
      <div className="chat-composer"><form onSubmit={e=>{e.preventDefault();send()}}>
        <input ref={field} aria-label="Message assistant" value={input} onChange={e=>setInput(e.target.value)} maxLength={2000} placeholder="Follow your curiosity…" autoComplete="off"/>
        <button disabled={pending||!input.trim()} aria-label="Send message"><ArrowUp size={19}/></button>
      </form><p>AI replies · grounded in Trinadh's portfolio</p></div>
    </section>}
  </>;
}
