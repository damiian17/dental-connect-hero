
import { Star } from 'lucide-react';
import { testimonials } from '@/assets/mockData';
import { Card, CardContent } from '@/components/ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="testimonios" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Testimonios</h2>
          <p className="section-subtitle">
            Personas que han encontrado su dentista ideal a través de nuestro servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const {
              elementRef,
              isIntersecting
            } = useIntersectionObserver({
              threshold: 0.2,
              rootMargin: "0px 0px -100px 0px"
            });

            return (
              <div
                key={testimonial.id}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "transition-all duration-700",
                  `delay-${index * 100}`,
                  isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col h-full">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.text}"</p>
                      
                      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
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

export default Testimonials;
