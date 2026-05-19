import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { Manifesto } from '@/components/manifesto';
import { Services } from '@/components/services';
import { Process } from '@/components/process';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Process />
      </main>
    </>
  );
}
