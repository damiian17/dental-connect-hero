
import { Network, BadgePercent, PiggyBank, Clock } from 'lucide-react';
import { whyChooseUs } from '@/assets/mockData';
import { Card } from './ui/Card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  Network: Network,
  BadgePercent: BadgePercent,
  PiggyBank: PiggyBank,
  Clock: Clock
};

const WhyChooseUs = () => {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Por Qué Elegirnos</h2>
          <p className="section-subtitle">
            Nuestro servicio está diseñado para simplificar tu acceso a la atención dental de calidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {whyChooseUs.map((item, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });
            
            const IconComponent = IconMap[item.icon];
            
            return (
              <div
                key={item.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  "delay-" + (index * 100),
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Card variant="whyChoose">
                  <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-dental-accent/10 text-dental-accent">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
