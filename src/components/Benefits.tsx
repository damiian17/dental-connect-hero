
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit = ({ icon, title, description }: BenefitProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="pt-6">
        <div className="text-dental-primary mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export const Benefits = () => {
  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos servicios dentales de alta calidad con un enfoque en tu comodidad y satisfacción.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>}
            title="Experiencia Profesional"
            description="Nuestros dentistas tienen años de experiencia y formación continua para ofrecerte el mejor tratamiento."
          />
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>}
            title="Tecnología Avanzada"
            description="Utilizamos los últimos avances tecnológicos para diagnósticos precisos y tratamientos menos invasivos."
          />
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            title="Atención Personalizada"
            description="Cada paciente es único. Ofrecemos planes de tratamiento personalizados adaptados a tus necesidades."
          />
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>}
            title="Precios Competitivos"
            description="Creemos que la atención dental de calidad debe ser accesible para todos. Ofrecemos precios justos."
          />
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>}
            title="Facilidades de Pago"
            description="Ofrecemos diferentes opciones de pago y planes de financiamiento para tu conveniencia."
          />
          <Benefit 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>}
            title="Atención de Urgencias"
            description="Disponemos de un servicio de urgencias para atenderte cuando más lo necesitas."
          />
        </div>
      </div>
    </section>
  );
};

export default Benefits;
