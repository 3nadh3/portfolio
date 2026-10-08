import {useState,useRef,useEffect} from 'react';
import {MessageCircle,Send,X,ArrowUpRight} from 'lucide-react';
import {loadHistory,saveHistory,limitHistory,type ChatTurn} from '../lib/chatHistory';
import ChatMarkdown from './ChatMarkdown';
import {myInfo} from '../lib/data';
const failureMessage=`The assistant could not reply right now. Please try again. If it continues, [email Trinadh](mailto:${myInfo.email}) or [message him on LinkedIn](${myInfo.linkedin}) so he can fix it.`;

const greeting = {kind:'bot',text:"Hi! Ask me about Trinadh's experience, projects, or skills."};
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
  const busy = useRef(false);
  useEffect(()=>()=>{activeRequest.current?.abort()},[]);
  useEffect(()=>{if(open)field.current?.focus()},[open]);
  useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight},[messages,pending]);

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
    setPending(true);
    setInput('');
    setSuggestions([]);
    saveSuggestions([]);
    setMessages(m=>[...m,{kind:'user',text:question}]);
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),90000);
    activeRequest.current=controller;
    try {
      const res=await fetch('https://portfolio-chatbot-ozkz.onrender.com/chat',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({input:question,history:history.current}),signal:controller.signal
      });
      if(res.status===429)throw new Error('The AI service has reached its request limit. Please try again later.');
      const data=await res.json();
      if(!res.ok) {
        if(res.status===429||data.code==='PROVIDER_RATE_LIMITED')throw new Error('The AI service has reached its request limit. Please try again later.');
        throw Error();
      }
      if(typeof data.message!=='string'||!data.message.trim()||data.message==='error')throw Error();
      if(controller.signal.aborted)return;
      history.current=limitHistory([...history.current,{role:'user',content:question},{role:'assistant',content:data.message}]);
      saveHistory(history.current);
      const followUps=validSuggestions(data.suggestions);
      setSuggestions(followUps);
      saveSuggestions(followUps);
      setMessages(m=>[...m,{kind:'bot',text:data.message}]);
    } catch(error) {
      const message=error instanceof Error&&error.message==='The AI service has reached its request limit. Please try again later.' ? error.message : failureMessage;
      setMessages(m=>[...m,{kind:'bot',text:message}]);
      setInput(current=>current||question);
    } finally {
      clearTimeout(timer);
      activeRequest.current=null;
      busy.current=false;
      setPending(false);
      field.current?.focus();
    }
  };
  return <>
    <button className="chat-launcher" aria-expanded={open} aria-controls="chat-panel" onClick={()=>setOpen(!open)}>
      <MessageCircle size={18}/>Ask Trinadh's AI
    </button>
    {open&&<section id="chat-panel" className="chat-panel" role="dialog" aria-label="Trinadh's assistant" onKeyDown={e=>{if(e.key==='Escape')setOpen(false)}}>
      <div className="flex justify-between items-center p-5 border-b border-white/10 shrink-0">
        <div><strong>Trinadh's Assistant</strong><p className="text-xs text-white/50 mt-1">Explore the story behind the code</p></div>
        <div className="flex items-center gap-3">
          <button type="button" disabled={pending} onClick={newChat} className="text-xs text-white/70 disabled:opacity-40">New chat</button>
          <button onClick={()=>setOpen(false)} aria-label="Close assistant"><X size={20}/></button>
        </div>
      </div>
      <div ref={log} role="log" aria-live="polite" className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
        {messages.map((m,i)=><div key={i} className={'chat-message '+m.kind}>
          {m.kind==='bot'?<ChatMarkdown text={m.text}/>:m.text}
        </div>)}
        {pending&&<p role="status" className="text-sm text-white/50 animate-pulse">Thinking…</p>}
      </div>
      {!!suggestions.length&&!pending&&<div className="chat-follow-ups" aria-label="Suggested follow-up questions">
        <p>Continue the conversation</p>
        {suggestions.map(q=><button key={q} type="button" onClick={()=>send(q)}><span>{q}</span><ArrowUpRight size={14} aria-hidden="true"/></button>)}
      </div>}
      <form className="p-4 border-t border-white/10 flex gap-2 shrink-0" onSubmit={e=>{e.preventDefault();send()}}>
        <input ref={field} aria-label="Message assistant" value={input} onChange={e=>setInput(e.target.value)} maxLength={2000} placeholder="Ask about my work…" className="min-w-0 flex-1 bg-white/10 rounded p-3 text-sm"/>
        <button disabled={pending||!input.trim()} className="bg-netflix-red p-3 rounded disabled:opacity-40" aria-label="Send message"><Send size={18}/></button>
      </form>
    </section>}
  </>;
}
