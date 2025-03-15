
import { Network, BadgePercent, PiggyBank, Clock } from 'lucide-react';
import { whyChooseUs } from '@/assets/mockData';
import { Card } from '@/components/ui/Card';
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
    <section id="why-choose-us" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro compromiso es ofrecerte la mejor experiencia dental con tecnología avanzada y un equipo profesional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = IconMap[item.icon];
            const { elementRef, isIntersecting } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: '0px 0px -100px 0px',
              triggerOnce: true
            });
            
            return (
              <div
                key={index}
                ref={elementRef}
                className={cn(
                  "transition-all duration-700 delay-100",
                  isIntersecting ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="text-dental-primary mb-4">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
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
