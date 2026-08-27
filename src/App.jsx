import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Workspace from './pages/Workspace.jsx'
import Apps from './pages/Apps.jsx'
import AppView from './pages/AppView.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app/:id" element={<AppView />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
