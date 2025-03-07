
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const FinalCTA = () => {
  const {
    elementRef,
    isIntersecting
  } = useIntersectionObserver({
    threshold: 0.3
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-dental-dark/5 to-dental-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dental-dark">
            Resuelve tus problemas dentales hoy mismo
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Estamos aquí para ayudarte a encontrar la clínica dental perfecta para tus necesidades. 
            Nuestro servicio es completamente gratuito.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a href="tel:+12768007201,5" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto group"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                Llámanos Ahora
              </Button>
            </a>
            <Button 
              variant="secondary"
              className="w-full sm:w-auto group"
              size="lg"
            >
              <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
              Chatea con Nosotros
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
