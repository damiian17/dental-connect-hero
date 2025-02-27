
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-dental-primary to-dental-secondary bg-clip-text text-transparent">
                DentalConnect
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-dental-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Call button */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:900123456" 
              className="flex items-center text-dental-primary font-medium hover:text-dental-primary/80 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              900 123 456
            </a>
            <Button>Pedir Cita</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-dental-primary transition-colors"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fade-in-down">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-3 text-gray-700 hover:text-dental-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="tel:900123456" 
                className="py-3 flex items-center text-dental-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2" />
                900 123 456
              </a>
              <Button className="mt-3" onClick={() => setIsMenuOpen(false)}>
                Pedir Cita
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
