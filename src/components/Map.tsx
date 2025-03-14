
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-8 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Encuentra clínicas cercanas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Introduce tu código postal para ver especialistas en tu zona
          </p>
        </div>
        
        <div className="max-w-lg mx-auto mb-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Código postal (p.ej. 28001)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-dental-primary"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>
        </div>
        
        <div 
          ref={mapRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "transition-all duration-700 h-[400px] bg-white rounded-lg shadow-md overflow-hidden",
            mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Map view would be placed here */}
          <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400">
            <p className="text-center">
              Mapa interactivo de clínicas<br />
              (en implementación)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
