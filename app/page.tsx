import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import Guestbook from "@/components/Guestbook";
import BackToTop from "@/components/BackToTop";
import ScrollDownHint from "@/components/ScrollDownHint";


export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Gallery />
      <Guestbook />
      {/* <Map /> */}
      <ScrollDownHint />
      <BackToTop />
    </main>
  );
}
