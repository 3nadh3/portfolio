import {useEffect,useState} from 'react';
import {Square} from 'lucide-react';

export function JamboAvatar({animated=false}: {animated?: boolean}) {
  return <span className={'jambo-avatar'+(animated?' is-active':'')} aria-hidden="true">
    <span className="jambo-face"><i/><i/><b/></span>
  </span>;
}

export default function ChatActivity({onStop}: {onStop:()=>void}) {
  const [elapsed,setElapsed]=useState(0);
  useEffect(()=>{
    const started=Date.now();
    const timer=setInterval(()=>setElapsed(Math.floor((Date.now()-started)/1000)),1000);
    return ()=>clearInterval(timer);
  },[]);
  const title=elapsed>=25?'Still waiting for the AI service':elapsed>=10?'Taking a little longer…':'A little spark of curiosity…';
  return <div className="chat-activity">
    <JamboAvatar animated/>
    <div className="chat-activity-body">
      <span className="chat-speaker">Jambo</span>
      <div role="status"><span className="sr-only">Jambo is preparing a reply.</span><strong aria-hidden="true">{title}</strong></div>
      {elapsed>=25?<p>The service may be waking up. You can stop and retry.</p>:<div className="chat-wave" aria-hidden="true">{Array.from({length:5},(_,i)=><i key={i}/>)}</div>}
      <div className="chat-wait-controls"><span aria-hidden="true">{elapsed}s elapsed</span><button type="button" onClick={onStop}><Square size={10} fill="currentColor" aria-hidden="true"/>Stop</button></div>
    </div>
  </div>;
}
