import { Contacts } from '@/components/contacts';
import { Hero } from '@/components/hero';
import { OnlineSection } from '@/components/online-section';
import { Process } from '@/components/process';
import { Projects } from '@/components/projects';
import { Services } from '@/components/services';
import { StackStrip } from '@/components/stack-strip';
import { services } from '@/lib/data/services';
import { email, githubUrl, site, telegramUrl } from '@/lib/data/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.description,
  email,
  sameAs: [githubUrl, telegramUrl],
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: service.tab, description: service.text }
  }))
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <StackStrip />
      <OnlineSection />
      <Services />
      <Projects />
      <Process />
      <Contacts />
    </>
  );
}
