
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const FinalCTA = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
  });
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "bg-gradient-to-r from-dental-primary to-dental-secondary rounded-3xl p-8 md:p-16 text-center text-white shadow-xl transition-all duration-700",
            isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Resuelve tus problemas dentales hoy mismo</h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Estamos aquí para ayudarte a encontrar la mejor atención dental adaptada a tus necesidades específicas.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10">
            <a href="tel:900123456" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto bg-white text-dental-primary hover:bg-gray-100 group"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
                900 123 456
              </Button>
            </a>
            <Button 
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/20 group"
              size="lg"
            >
              <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-wiggle" />
              Chatea con Nosotros
            </Button>
          </div>
          
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm font-medium">Atendiendo ahora • Respuesta inmediata</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
