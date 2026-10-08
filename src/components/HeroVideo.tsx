import {useEffect,useRef,useState} from 'react';
import {Volume2,VolumeX} from 'lucide-react';
import {getSoundMuted,saveSoundMuted} from '../lib/soundPreference';

export default function HeroVideo({src}:{src:string}) {
  const video=useRef<HTMLVideoElement>(null);
  const attempt=useRef(0);
  const [muted,setMuted]=useState(getSoundMuted);
  const [autoplayBlocked,setAutoplayBlocked]=useState(false);

  useEffect(()=>{
    const media=video.current;
    if(!media)return;
    const id=++attempt.current;
    const preferredMuted=getSoundMuted();
    media.muted=preferredMuted;
    media.play().catch(error=>{
      if(attempt.current!==id||preferredMuted||error?.name!=='NotAllowedError')return;
      // Keep the video moving if audible autoplay is blocked. This is not
      // the visitor's choice, so it must never overwrite their preference.
      media.muted=true;
      setMuted(true);
      setAutoplayBlocked(true);
      void media.play().catch(()=>{});
    });
    return ()=>{attempt.current++};
  },[src]);

  const toggleSound=()=>{
    attempt.current++;
    const next=!muted;
    saveSoundMuted(next);
    setMuted(next);
    setAutoplayBlocked(false);
    if(video.current) {
      video.current.muted=next;
      // Called directly from the click so browsers can allow sound playback.
      void video.current.play().catch(()=>{});
    }
  };

  return <>
    <video ref={video} src={src} autoPlay loop muted={muted} playsInline className="absolute inset-0 w-full h-full object-cover"/>
    <button onClick={toggleSound} aria-label={muted?'Unmute video':'Mute video'} title={autoplayBlocked?'Your browser blocked autoplay with sound. Click to enable sound.':undefined} className="absolute right-6 bottom-12 z-10 p-3 border border-white/60 rounded-full">
      {muted?<VolumeX size={20}/>:<Volume2 size={20}/>}
    </button>
  </>;
}
