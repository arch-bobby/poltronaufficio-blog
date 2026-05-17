import AsciiTunnel from '../sections/AsciiTunnel';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import FeaturedArticles from '../sections/FeaturedArticles';
import ProductSpotlight from '../sections/ProductSpotlight';
import LatestNews from '../sections/LatestNews';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <>
      <AsciiTunnel />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />
        <HeroSection />
        <FeaturedArticles />
        <ProductSpotlight />
        <LatestNews />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
