
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
    <section id="como-funciona" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conectar con los mejores especialistas dentales nunca fue tan fácil
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = IconMap[step.icon];
            
            return (
              <div 
                key={step.id} 
                className={cn(
                  "text-center transition-all duration-700",
                  titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-dental-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5 text-dental-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-dental-dark">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
          
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-dental-light" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
