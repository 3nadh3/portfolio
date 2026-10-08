import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import ProfileSelection from './pages/ProfileSelection';
import ProfilePage from './pages/ProfilePage';
export default function App(){return <HashRouter><Routes><Route path="/" element={<Landing/>}/><Route path="/profiles" element={<ProfileSelection/>}/><Route path="/profile/:profileType" element={<ProfilePage/>}/><Route path="*" element={<Navigate to="/profiles" replace/>}/></Routes></HashRouter>}
