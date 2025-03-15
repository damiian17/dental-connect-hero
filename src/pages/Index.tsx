
import React from 'react';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Map from '@/components/Map';
import FinalCTA from '@/components/FinalCTA';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Map />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default IndexPage;
