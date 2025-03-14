
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const Map = () => {
  const [postalCode, setPostalCode] = useState('');
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  
  const {
    elementRef: mapRef,
    isIntersecting: mapVisible
  } = useIntersectionObserver({
    threshold: 0.1
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the actual search logic
    console.log('Searching for clinics near:', postalCode);
  };
  
  return (
    <section id="encontrar-clinica" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Encuentra una clínica cerca de ti</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Introduce tu código postal para descubrir las mejores clínicas a tu alrededor
          </p>
        </div>
        
        <div 
          ref={mapRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700",
            mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="p-6 bg-dental-primary">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Código postal"
                className="flex-grow px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-dental-light"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <Button type="submit" variant="secondary" className="py-3 flex gap-2 items-center">
                <Search className="h-5 w-5" />
                <span>Buscar</span>
              </Button>
            </form>
          </div>
          
          {/* Map placeholder - To be replaced with actual map implementation */}
          <div className="h-96 bg-gray-100 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-400 mb-2">Mapa de clínicas</p>
              <p className="text-gray-500">Aquí se mostrará el mapa interactivo con las clínicas disponibles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
