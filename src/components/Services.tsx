
import { useState } from 'react';
import { services } from '@/assets/mockData';
import { Card } from './ui/card';
import { Layers, PlusCircle, AlertTriangle, Baby, Smile, ZapOff, Scanner, Tooth } from 'lucide-react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  Tooth: Tooth,
  Layers: Layers,
  PlusCircle: PlusCircle,
  Baby: Baby,
  Smile: Smile,
  ZapOff: ZapOff,
  Scanner: Scanner,
  AlertTriangle: AlertTriangle
};

const Services = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conectamos pacientes con las mejores clínicas especializadas en cada tratamiento
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon];
            const {
              elementRef,
              isIntersecting
            } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: "0px 0px -100px 0px"
            });
            
            return (
              <div 
                key={service.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="h-16 w-16 rounded-full bg-dental-light flex items-center justify-center text-dental-primary mx-auto mb-5">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dental-dark">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
