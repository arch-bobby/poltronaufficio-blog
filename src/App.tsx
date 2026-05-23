import { Routes, Route } from 'react-router'
import Navigation from './sections/Navigation'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import BooksPage from './pages/BooksPage'
import NovitaPage from './pages/NovitaPage'
import ProdottiPage from './pages/ProdottiPage'
import GuidesPage from './pages/GuidesPage'
import DesignPage from './pages/DesignPage'
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '64px' }}>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articolo/:slug" element={<ArticlePage />} />
      <Route path="/libri" element={<BooksPage />} />
      <Route path="/novita" element={<NovitaPage />} />
      <Route path="/prodotti" element={<ProdottiPage />} />
      <Route path="/guide" element={<GuidesPage />} />
      <Route path="/design" element={<DesignPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <WhatsAppButton />
    </div>
    </>
  )
}
