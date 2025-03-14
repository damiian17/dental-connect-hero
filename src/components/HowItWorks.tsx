
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
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Cómo funciona</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontrar la clínica dental perfecta nunca ha sido tan fácil. Sigue estos sencillos pasos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });
            const IconComponent = IconMap[step.icon];
            
            return (
              <div
                key={step.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "text-center transition-all duration-700",
                  `delay-${index * 100}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <div className="bg-dental-primary/10 text-dental-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="relative mb-6">
                  <div className="text-3xl font-bold text-dental-primary">{index + 1}</div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
