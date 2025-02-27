
import { Tooth, Layers, PlusCircle, Baby, Smile, ZapOff, Scanner, AlertTriangle } from 'lucide-react';
import { services } from '@/assets/mockData';
import { Card } from './ui/Card';
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
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  
  return (
    <section id="servicios" className="section-padding">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Servicios Dentales Cubiertos</h2>
          <p className="section-subtitle">
            Conectamos con especialistas de todas las áreas para asegurar la mejor atención.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: "0px 0px -100px 0px"
            });
            
            const IconComponent = IconMap[service.icon];
            
            return (
              <div
                key={service.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  "delay-" + (index % 4 * 100),
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Card variant="service">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-dental-secondary/10 text-dental-secondary">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
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
