
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-dental-primary to-dental-secondary bg-clip-text text-transparent">
              DentalConnect
            </h3>
            <p className="text-gray-400 mb-6">
              Conectamos a pacientes con las mejores clínicas dentales según sus necesidades específicas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-dental-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-dental-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buscar dentista</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Urgencias dentales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Especialidades</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seguros dentales</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Clínicas asociadas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog de salud dental</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <p className="text-gray-400 mb-2">Llámanos: 900 123 456</p>
            <p className="text-gray-400 mb-2">Email: info@dentalconnect.es</p>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Urgencias 24/7:</strong><br />
                Disponibles todos los días, incluso festivos.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} DentalConnect. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Aviso Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
