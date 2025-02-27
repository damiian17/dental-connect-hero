
import { MessageSquare, MapPin, Calendar } from 'lucide-react';
import { steps } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  MessageSquare: MessageSquare,
  MapPin: MapPin,
  Calendar: Calendar
};

const HowItWorks = () => {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  
  return (
    <section id="como-funciona" className="section-padding">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">¿Cómo Funciona?</h2>
          <p className="section-subtitle">
            En tres sencillos pasos, conectamos contigo la clínica dental perfecta para tus necesidades.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-dental-primary/20 via-dental-primary/40 to-dental-primary/20 hidden md:block"></div>
          
          {steps.map((step, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });
            
            const IconComponent = IconMap[step.icon];
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={step.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "relative mb-16 last:mb-0 transition-all duration-700",
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div 
                    className={cn(
                      "md:w-1/2 text-center",
                      isEven ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16 md:text-left"
                    )}
                  >
                    <h3 className="text-2xl font-bold mb-3 text-dental-dark">
                      <span className="text-dental-primary">{step.id}.</span> {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div 
                    className={cn(
                      "flex items-center justify-center w-16 h-16 mb-6 md:mb-0 rounded-full bg-dental-primary text-white relative z-10 shadow-lg",
                      isEven ? "md:order-2" : "md:order-1"
                    )}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Background circle */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-dental-primary/10 -z-10 hidden md:block"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
