import HeroSection from '../sections/HeroSection';
import FeaturedArticles from '../sections/FeaturedArticles';
import ProductSpotlight from '../sections/ProductSpotlight';
import LatestNews from '../sections/LatestNews';
import GuideSection from '../sections/GuideSection';
import BooksSection from '../sections/BooksSection';
import ChiSiamoSection from '../sections/ChiSiamoSection';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <HeroSection />
      <FeaturedArticles />
      <ProductSpotlight />
      <LatestNews />
      <GuideSection />
      <BooksSection />
      <ChiSiamoSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
