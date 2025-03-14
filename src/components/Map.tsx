
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
    <section id="mapa" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">
            Encuentra clínicas en tu zona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Busca por código postal y descubre las mejores clínicas dentales cerca de ti
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="block w-full rounded-l-md border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dental-primary"
                placeholder="Introduce tu código postal"
              />
            </div>
            <Button 
              type="submit"
              className="rounded-l-none"
            >
              Buscar
            </Button>
          </form>
        </div>
        
        <div 
          ref={mapRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "bg-white rounded-lg overflow-hidden shadow-md transition-all duration-700",
            mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Mapa interactivo próximamente</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
