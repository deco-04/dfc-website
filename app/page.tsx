import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Marquee } from '@/components/marquee';
import { Manifesto } from '@/components/manifesto';
import { Services } from '@/components/services';
import { Process } from '@/components/process';
import { Gallery } from '@/components/gallery';
import { Testimonial } from '@/components/testimonial';
import { Climate } from '@/components/climate';
import { ServiceArea } from '@/components/service-area';
import { SplitCards } from '@/components/split-cards';
import { Faq } from '@/components/faq';
import { BottomCta } from '@/components/bottom-cta';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import {
  buildLocalBusinessSchema,
  buildFaqSchema,
  buildReviewSchema,
  buildServiceCatalogSchema,
  buildPersonSchema,
  buildProcessHowToSchema,
} from '@/lib/schema';
import { FAQS } from '@/components/faq.data';
import { SPECIMENS } from '@/components/services.data';

export default function Home() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildFaqSchema(FAQS)} />
      <JsonLd data={buildReviewSchema()} />
      <JsonLd data={buildPersonSchema()} />
      <JsonLd data={buildProcessHowToSchema()} />
      <JsonLd
        data={buildServiceCatalogSchema(
          SPECIMENS.map((s) => ({ slug: s.slug, name: s.name, description: s.body }))
        )}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Process />
        <Gallery />
        <Testimonial />
        <Climate />
        <ServiceArea />
        <SplitCards />
        <Faq />
        <BottomCta />
      </main>
      <Footer />
    </>
  );
}
