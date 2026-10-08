import {lazy,Suspense} from 'react';
import {HashRouter,Routes,Route,Navigate} from 'react-router-dom';
import Landing from './pages/Landing';
import ProfileSelection from './pages/ProfileSelection';
const ProfilePage=lazy(()=>import('./pages/ProfilePage'));

export default function App() {
  return <HashRouter><Suspense fallback={<main className="min-h-[100dvh] bg-netflix-dark flex items-center justify-center"><p role="status" className="text-white/70">Opening profile…</p></main>}>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/profiles" element={<ProfileSelection/>}/>
      <Route path="/profile/:profileType" element={<ProfilePage/>}/>
      <Route path="*" element={<Navigate to="/profiles" replace/>}/>
    </Routes>
  </Suspense></HashRouter>;
}
