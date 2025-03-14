
import { Star } from 'lucide-react';
import { testimonials } from '@/assets/mockData';
import { Card } from './ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();

  return (
    <section id="testimonios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Lo que dicen nuestros pacientes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre las experiencias de quienes ya han confiado en nuestro servicio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "transition-all duration-700 delay-100",
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="h-full flex flex-col p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < 5 ? "text-yellow-500" : "text-gray-300"} fill-current`} 
                    />
                  ))}
                </div>
                
                <p className="italic my-4 text-gray-600 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-dental-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-dental-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.treatment}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
