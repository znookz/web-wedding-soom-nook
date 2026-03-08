import Hero from "@/components/Hero";
import CountdownSection from "@/components/CountdownSection";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import Guestbook from "@/components/Guestbook";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Hero />
      <CountdownSection />
      <Gallery />
      <Guestbook />
      <Map />
      <BackToTop />
    </main>
  );
}
