
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { trackPhoneCall } from '@/lib/supabase';

const FinalCTA = () => {
  const {
    elementRef,
    isIntersecting
  } = useIntersectionObserver({
    threshold: 0.3
  });

  const handlePhoneCall = () => {
    trackPhoneCall('footer_cta');
    window.location.href = 'tel:+12768007201';
  };

  return (
    <section className="bg-dental-primary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000 ease-out",
            isIntersecting ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Tienes alguna urgencia dental?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Nuestro equipo está listo para atenderte de inmediato. Contacta con nosotros ahora y resolveremos tu problema dental lo antes posible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-dental-primary font-medium text-lg px-8 py-6 flex items-center gap-2"
              onClick={handlePhoneCall}
            >
              <Phone className="h-5 w-5" />
              Llamar ahora
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6 flex items-center gap-2"
              asChild
            >
              <a href="#contacto">
                <MessageSquare className="h-5 w-5" />
                Solicitar cita
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
