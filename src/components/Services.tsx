
import { CalendarCheck, ListChecks, CirclePlus, Baby, Smile, Zap, Activity, AlertTriangle } from 'lucide-react';
import { services } from '@/assets/mockData';
import { Card, CardContent } from '@/components/ui/card';
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
    <section id="servicios" className="section-padding">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>} 
          className={cn(
            "text-center mb-16 transition-all duration-700", 
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Contamos con una amplia variedad de especialistas y tratamientos para todas tus necesidades dentales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const {
              elementRef,
              isIntersecting
            } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });
            
            const IconComponent = IconMap[service.icon];
            
            return (
              <div 
                key={service.id} 
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700", 
                  `delay-${index * 100}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-dental-primary/10 text-dental-primary mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </CardContent>
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
