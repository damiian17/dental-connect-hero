
import { Network, BadgePercent, PiggyBank, Clock } from 'lucide-react';
import { whyChooseUs } from '@/assets/mockData';
import { Card, CardContent } from './ui/card';
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Por qué elegirnos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En DentalConnect nos esforzamos por ofrecer el mejor servicio posible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyChooseUs.map((item, index) => {
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });
            const IconComponent = IconMap[item.icon];
            
            return (
              <Card
                key={item.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  `delay-${index * 100}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <CardContent className="p-6 flex items-start">
                  <div className="bg-dental-primary/10 text-dental-primary w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
