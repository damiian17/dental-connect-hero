
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
    <section id="faq" className="py-16 bg-white">
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
            Respondemos a las dudas más comunes sobre nuestro servicio
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={faq.id}
                className={cn(
                  "mb-4 border rounded-lg overflow-hidden transition-all duration-300",
                  isOpen ? "shadow-md" : "shadow-sm",
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  className="w-full text-left p-4 md:p-6 flex justify-between items-center bg-white"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-medium text-lg text-dental-dark">{faq.question}</h3>
                  <span className="text-dental-primary ml-4">
                    {isOpen ? <MinusCircle className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
                  </span>
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="p-4 md:p-6 pt-0 text-gray-600 bg-white">
                    {faq.answer}
                  </div>
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
