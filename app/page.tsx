import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
      </main>
    </>
  );
}
