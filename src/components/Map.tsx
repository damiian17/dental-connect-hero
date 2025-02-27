
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const Map = () => {
  const [postalCode, setPostalCode] = useState('');
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver();
  const { elementRef: mapRef, isIntersecting: mapVisible } = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the actual search logic
    console.log('Searching for clinics near:', postalCode);
  };
  
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-16 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="section-title">Encuentra Clínicas Cercanas</h2>
          <p className="section-subtitle">
            Descubre nuestra amplia red de clínicas dentales asociadas en toda España.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div 
            ref={mapRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700",
              mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* Map placeholder - in a real app, this would be replaced with an actual map integration */}
            <div className="bg-gray-200 aspect-w-16 aspect-h-9 h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center p-8">
                  <div className="text-gray-400 text-4xl mb-4">🗺️</div>
                  <h3 className="text-lg font-bold mb-2">Mapa de Clínicas Dentales</h3>
                  <p className="text-gray-500 mb-4">En una implementación real, aquí se mostraría un mapa interactivo con las clínicas dentales cercanas.</p>
                </div>
              </div>
            </div>
            
            {/* Search overlay */}
            <div className="absolute top-5 left-0 right-0 px-5">
              <form 
                onSubmit={handleSearch}
                className="max-w-md mx-auto bg-white rounded-full shadow-lg p-1 flex"
              >
                <input
                  type="text"
                  placeholder="Introduce tu código postal..."
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="flex-1 py-3 px-5 bg-transparent rounded-full outline-none"
                />
                <Button type="submit" className="rounded-full">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </form>
            </div>
            
            {/* Coverage info */}
            <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
              <h4 className="font-bold text-sm mb-2">Cobertura Nacional</h4>
              <p className="text-gray-600 text-xs">
                Contamos con más de 200 clínicas asociadas en las principales ciudades de España.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
