
import { Card, CardContent } from "@/components/ui/card";

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Service = ({ icon, title, description }: ServiceProps) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="text-dental-primary mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export const Services = () => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios de odontología general y especializada.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7.5V9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/><path d="M9 16.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/><path d="M19 7.5V9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/><path d="M19 16.5V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>}
            title="Odontología General"
            description="Tratamientos preventivos y restauradores para mantener tu salud bucal en óptimas condiciones."
          />
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14c3.31 0 6-1.34 6-3s-2.69-3-6-3-6 1.34-6 3 2.69 3 6 3Z"/><path d="M5.5 12.2v3.3c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.3"/></svg>}
            title="Implantes Dentales"
            description="Sustitución de piezas dentales perdidas con implantes de titanio para una función y estética óptimas."
          />
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>}
            title="Ortodoncia"
            description="Corrección de la posición de los dientes para mejorar la mordida y la apariencia de tu sonrisa."
          />
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>}
            title="Endodoncia"
            description="Tratamiento del interior del diente para preservar piezas dañadas y evitar extracciones."
          />
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>}
            title="Estética Dental"
            description="Procedimientos para mejorar la apariencia de tu sonrisa, como blanqueamiento y carillas."
          />
          <Service 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>}
            title="Odontopediatría"
            description="Atención especializada para niños, creando experiencias positivas desde temprana edad."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
