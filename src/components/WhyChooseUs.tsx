
import { Network, BadgePercent, PiggyBank, Clock } from 'lucide-react';
import { whyChooseUs } from '@/assets/mockData';
import { Card } from './ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  Network: Network,
  BadgePercent: BadgePercent,
  PiggyBank: PiggyBank,
  Clock: Clock
};

const WhyChooseUs = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="por-que-elegirnos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">¿Por qué elegirnos?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Las razones por las que somos tu mejor opción para encontrar atención dental
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = IconMap[item.icon];
            const {
              elementRef,
              isIntersecting
            } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: "0px 0px -100px 0px"
            });
            
            return (
              <div 
                key={item.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="h-16 w-16 rounded-full bg-dental-light flex items-center justify-center text-dental-primary mx-auto mb-5">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dental-dark">{item.title}</h3>
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
