// Adapted from the reference's profile selector and separate entrance animations.
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {profiles} from '@/lib/data';

export default function ProfileSelection() {
  useEffect(()=>{
    // Warm the next route after the selector has painted, before a profile click.
    const timer=setTimeout(()=>{void import('./ProfilePage')},200);
    return ()=>clearTimeout(timer);
  },[]);
  return <main className="min-h-[100dvh] bg-netflix-dark flex flex-col items-center justify-center p-6">
    <Link to="/" className="absolute top-6 left-6 md:left-12 text-3xl text-netflix-red font-bold tracking-tighter">TRINADH</Link>
    <h1 className="text-white text-4xl font-medium mb-16 animate-fade-in">Who's Watching?</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 animate-slide-in">
      {profiles.map(p=><Link key={p.type} to={'/profile/'+p.type.toLowerCase()} className="group flex flex-col items-center text-center text-netflix-gray hover:text-white transform transition-transform duration-300 hover:scale-110">
        <img src={'./lovable-uploads/'+p.avatar} alt="" className="w-28 h-28 md:w-36 md:h-36 mb-4 object-cover rounded border-4 border-transparent group-hover:border-white group-focus-visible:border-white transition-[transform,border-color] duration-300 group-hover:scale-105"/>
        <span className="text-xl transition-colors duration-300">{p.type}</span>
      </Link>)}
    </div>
  </main>;
}
