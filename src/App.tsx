import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articolo/:slug" element={<ArticlePage />} />
    </Routes>
  )
}
