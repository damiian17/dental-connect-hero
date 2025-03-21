import { Clock, User, MapPin, BellRing } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { benefits } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const IconMap: Record<string, any> = {
  Clock: Clock,
  User: User,
  MapPin: MapPin,
  BellRing: BellRing
};
const Benefits = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  return <section className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className={cn("text-center mb-16 transition-all duration-700", titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <h2 className="section-title">Beneficios de Nuestro Servicio</h2>
          <p className="section-subtitle">
            Te ofrecemos una experiencia sencilla y efectiva para encontrar la atención dental que necesitas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
          const {
            elementRef,
            isIntersecting
          } = useIntersectionObserver({
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px"
          });
          const IconComponent = IconMap[benefit.icon];
          return <div key={benefit.id} ref={elementRef as React.RefObject<HTMLDivElement>} className={cn("transition-all duration-700", "delay-" + index * 100, isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
                <Card className="p-6 bg-blue-50">
                  <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-dental-primary/10 text-dental-primary">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default Benefits;