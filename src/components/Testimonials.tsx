
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de pacientes han encontrado su dentista ideal a través de nuestro servicio. Estas son algunas de sus experiencias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
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
                
                <blockquote className="text-gray-700 italic">"{testimonial.comment}"</blockquote>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-dental-primary font-medium">
                    Tratamiento: {testimonial.treatment}
                  </p>
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
