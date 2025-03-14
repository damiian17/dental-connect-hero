
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
    <section id="como-funciona" className="section-padding bg-white">
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
            Reservar tu cita dental en unos pocos pasos sencillos.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-dental-primary/20 -translate-x-1/2"></div>
          
          <div className="space-y-16 md:space-y-0">
            {steps.map((step, index) => {
              const {
                elementRef,
                isIntersecting
              } = useIntersectionObserver({
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
                    "flex flex-col md:flex-row items-center transition-all duration-700",
                    isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                >
                  {/* Left side (text for even steps on desktop) */}
                  <div className={cn(
                    "md:w-1/2 text-center md:text-right px-4 md:pr-10",
                    !isEven && "md:order-2 md:text-left md:pl-10 md:pr-4"
                  )}>
                    {isEven && (
                      <>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Icon in the middle */}
                  <div className="relative md:w-0 my-4 md:my-0 z-10">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-dental-primary text-white shadow-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="absolute top-0 left-0 right-0 text-center -mt-7 font-bold text-dental-primary">
                      Paso {index + 1}
                    </div>
                  </div>
                  
                  {/* Right side (text for odd steps on desktop) */}
                  <div className={cn(
                    "md:w-1/2 text-center md:text-left px-4 md:pl-10",
                    isEven && "md:order-2 md:text-right md:pr-10 md:pl-4"
                  )}>
                    {!isEven && (
                      <>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
