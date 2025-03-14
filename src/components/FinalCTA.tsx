
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
    <section className="py-16 bg-gradient-to-r from-dental-dark to-dental-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>} 
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para sonreír con confianza?</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Nuestro servicio gratuito te conecta con los mejores especialistas dentales de tu zona en cuestión de segundos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              onClick={handlePhoneCall}
              variant="secondary" 
              className="w-full sm:w-auto group bg-white text-dental-primary hover:bg-gray-100"
              size="lg"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
              Llámanos Ahora
            </Button>
            
            <Button 
              className="w-full sm:w-auto group bg-transparent border-2 border-white hover:bg-white/10"
              size="lg"
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
