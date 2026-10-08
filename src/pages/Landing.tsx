// Personalized from shamihsnn/netflix-portfolio's one-second fade/zoom intro.
import {useRef,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Volume2,VolumeX} from 'lucide-react';
import {getIntroAudio} from '../lib/introAudio';

export default function Landing() {
  const navigate = useNavigate();
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();
  const soundTimer = useRef<ReturnType<typeof setTimeout>>();
  const started = useRef(false);
  const clicked = useRef(false);
  const sound = useRef<HTMLAudioElement>();
  const startListener = useRef<(()=>void)>();
  const [revealed,setRevealed] = useState(false);
  const [exiting,setExiting] = useState(false);
  const [entering,setEntering] = useState(false);
  const [muted,setMuted] = useState(false);
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(()=>{
    sound.current=getIntroAudio();
    const revealTimer=setTimeout(()=>setRevealed(true),reducedMotion()?0:1000);
    return ()=>{
      clearTimeout(revealTimer);
      clearTimeout(transitionTimer.current);
      clearTimeout(soundTimer.current);
      if(startListener.current)sound.current?.removeEventListener('playing',startListener.current);
      // Like the reference, the sound finishes while profiles appear.
    };
  },[]);

  const enter = () => {
    if(clicked.current)return;
    clicked.current=true;
    setEntering(true);
    const start = () => {
      if(started.current)return;
      started.current=true;
      clearTimeout(soundTimer.current);
      setExiting(true);
      transitionTimer.current=setTimeout(()=>navigate('/profiles'),reducedMotion()?0:3000);
    };
    if(muted) { start(); return; }
    const audio=sound.current||getIntroAudio();
    audio.pause();
    audio.currentTime=0;
    audio.muted=false;
    startListener.current=start;
    audio.addEventListener('playing',start,{once:true});
    soundTimer.current=setTimeout(()=>{audio.pause();start()},1800);
    audio.play().catch(start);
  };
  const toggleSound = () => {
    const next=!muted;
    setMuted(next);
    if(sound.current)sound.current.muted=next;
  };
  return <main className="splash fixed inset-0 bg-netflix-dark flex items-center justify-center overflow-hidden">
    <button onClick={enter} disabled={entering} className="splash-enter text-center max-w-[86vw]" aria-label="Trinadh Musunuri — click to continue">
      <div className={'intro-mark'+(revealed?' revealed':'')+(exiting?' exiting':'')}>
        <h1 className="text-netflix-red font-bold text-5xl md:text-8xl tracking-tighter">TRINADH MUSUNURI</h1>
        <p className={'text-white text-center mt-4'+(entering?' invisible':' animate-pulse')}>Click to continue</p>
      </div>
    </button>
    <button className="absolute bottom-8 right-8 text-white/70 flex items-center gap-2 text-sm" onClick={toggleSound} aria-label={muted?'Enable intro sound':'Mute intro sound'}>
      {muted?<VolumeX size={18}/>:<Volume2 size={18}/>}Sound {muted?'off':'on'}
    </button>
  </main>;
}
