import Hero from "@/components/Hero";
import CountdownSection from "@/components/CountdownSection";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import Guestbook from "@/components/Guestbook";

export default function Home() {

  return (
    <main>

      <Hero />

      <CountdownSection />

      <Gallery />

      <Guestbook />

      <Map />

    </main>
  );
}