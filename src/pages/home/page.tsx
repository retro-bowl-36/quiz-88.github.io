import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import GamesSection from "./components/GamesSection";
import Footer from "./components/Footer";
import WelcomeModal from "./components/WelcomeModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <WelcomeModal />
      <Navbar />
      <HeroCarousel />
      <GamesSection />
      <Footer />
    </div>
  );
}