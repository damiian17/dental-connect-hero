
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const Hero = () => {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  const { elementRef: subtitleRef, isIntersecting: subtitleVisible } = useIntersectionObserver({
    threshold: 0.2,
  });
  const { elementRef: ctaRef, isIntersecting: ctaVisible } = useIntersectionObserver({
    threshold: 0.3,
  });

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 dots-bg opacity-40"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-dental-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-dental-secondary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={titleRef as React.RefObject<HTMLHeadingElement>} 
            className={cn(
              "transition-all duration-700 delay-100",
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="badge badge-primary mb-4">Servicio gratuito</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-dental-dark to-dental-primary bg-clip-text text-transparent">
                Encuentra la Clínica Dental Perfecta para Ti en Segundos
              </span>
            </h1>
          </div>
          
          <div 
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>} 
            className={cn(
              "transition-all duration-700 delay-300",
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Servicio gratuito que te conecta con el mejor dentista según tus necesidades y ubicación. Sin esperas, sin complicaciones.
            </p>
          </div>
          
          <div 
            ref={ctaRef as React.RefObject<HTMLDivElement>} 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-700 delay-500",
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
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
          
          <div className={cn(
            "mt-12 text-gray-500 text-sm transition-all duration-700 delay-700",
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p>Sin compromiso • Sin coste • Tu privacidad es nuestra prioridad</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center glass-card py-6 rounded-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-dental-primary to-dental-secondary bg-clip-text text-transparent">+200</div>
            <div className="text-gray-600 text-sm mt-1">Clínicas Asociadas</div>
          </div>
          <div className="flex flex-col items-center glass-card py-6 rounded-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-dental-primary to-dental-secondary bg-clip-text text-transparent">24/7</div>
            <div className="text-gray-600 text-sm mt-1">Atención Disponible</div>
          </div>
          <div className="flex flex-col items-center glass-card py-6 rounded-xl">
            <div className="text-3xl font-bold bg-gradient-to-r from-dental-primary to-dental-secondary bg-clip-text text-transparent">+10.000</div>
            <div className="text-gray-600 text-sm mt-1">Pacientes Satisfechos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
