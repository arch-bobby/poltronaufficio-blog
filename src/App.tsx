import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import AdminPage from './pages/AdminPage'
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articolo/:slug" element={<ArticlePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
