
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
    <section id="preguntas-frecuentes" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Preguntas Frecuentes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="py-5">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-xl font-medium text-dental-dark pr-8">{faq.question}</h3>
                <div className="flex-shrink-0 text-dental-primary">
                  {openIndex === index ? (
                    <MinusCircle className="h-6 w-6" />
                  ) : (
                    <PlusCircle className="h-6 w-6" />
                  )}
                </div>
              </div>
              
              <div 
                className={cn(
                  "mt-2 text-gray-600 transition-all duration-300 overflow-hidden",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="py-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
