
import { CalendarCheck, ListChecks, CirclePlus, Baby, Smile, Zap, Activity, AlertTriangle } from 'lucide-react';
import { services } from '@/assets/mockData';
import { Card, CardContent } from './ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  Tooth: CalendarCheck,
  Layers: ListChecks,
  PlusCircle: CirclePlus,
  Baby: Baby,
  Smile: Smile,
  ZapOff: Zap,
  Scanner: Activity,
  AlertTriangle: AlertTriangle
};

const Services = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Nuestros servicios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra clínicas con todos los servicios que necesitas para tu salud dental
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
              <Card
                key={service.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700 hover:shadow-lg",
                  `delay-${index * 50}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-dental-primary/10 text-dental-primary w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
