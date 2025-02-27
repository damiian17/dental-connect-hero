
import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { faqs } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  
  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  
  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Preguntas Frecuentes</h2>
          <p className="section-subtitle">
            Resolvemos tus dudas sobre nuestro servicio de conexión con clínicas dentales.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: "0px 0px -100px 0px"
            });
            
            const isOpen = openIndex === index;
            
            return (
              <div
                key={faq.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "mb-4 transition-all duration-700",
                  "delay-" + (index * 100),
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    {isOpen ? (
                      <MinusCircle className="flex-shrink-0 w-5 h-5 text-dental-primary" />
                    ) : (
                      <PlusCircle className="flex-shrink-0 w-5 h-5 text-dental-primary" />
                    )}
                  </button>
                  
                  <div 
                    className={cn(
                      "px-5 overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 pb-5" : "max-h-0"
                    )}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
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
