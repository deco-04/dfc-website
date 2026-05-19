import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { Manifesto } from '@/components/manifesto';
import { Services } from '@/components/services';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
      </main>
    </>
  );
}
