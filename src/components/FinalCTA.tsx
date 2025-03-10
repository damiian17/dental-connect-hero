
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
    <section className="bg-dental-primary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-3xl mx-auto transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para mejorar tu sonrisa?</h2>
          <p className="text-lg mb-8 opacity-90">Contacta ahora con nuestros especialistas y da el primer paso hacia la sonrisa que siempre has deseado.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-dental-primary hover:bg-gray-100 flex items-center gap-2 text-base"
              onClick={() => window.location.href = `tel:+12768007201`}
            >
              <Phone className="h-5 w-5" />
              Llámanos ahora
            </Button>
            
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-base"
              onClick={() => window.location.href = '#contacto'}
            >
              <MessageSquare className="h-5 w-5" />
              Solicitar cita por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
