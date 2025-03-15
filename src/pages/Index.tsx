
import React from 'react';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { Map } from '@/components/Map';
import { FinalCTA } from '@/components/FinalCTA';
import { FAQ } from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import { HowItWorks } from '@/components/HowItWorks';

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Services />
      <Benefits />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Map />
      <FinalCTA />
    </div>
  );
};

export default IndexPage;
