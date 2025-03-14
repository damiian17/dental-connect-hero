
import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { faqs } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Preguntas frecuentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestro servicio
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: "0px 0px -50px 0px"
            });
            const isOpen = openIndex === index;
            
            return (
              <div
                key={faq.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "mb-4 border-b border-gray-200 pb-4 transition-all duration-700",
                  `delay-${index * 100}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  {isOpen ? (
                    <MinusCircle className="h-5 w-5 text-dental-primary flex-shrink-0" />
                  ) : (
                    <PlusCircle className="h-5 w-5 text-dental-primary flex-shrink-0" />
                  )}
                </button>
                <div
                  className={cn(
                    "mt-2 text-gray-600 overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="pb-4">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
