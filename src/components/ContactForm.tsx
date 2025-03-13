import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    reason: '',
    time: ''
  });

  const {
    elementRef: formRef,
    isIntersecting: formVisible
  } = useIntersectionObserver({
    threshold: 0.1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);
      
      if (error) {
        console.error('Error submitting form:', error);
        toast({
          title: "Error",
          description: "Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Enviado con éxito!",
          description: "Te enviaremos los detalles de tu cita por WhatsApp.",
        });
        
        // Resetear el formulario
        setFormData({
          name: '',
          phone: '',
          location: '',
          reason: '',
          time: ''
        });
        
        // Redireccionar a WhatsApp después de guardar en Supabase
        window.location.href = 'https://wa.me/34623378691';
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Hubo un problema al conectar con la base de datos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={formRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700",
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dental-dark">Solicita tu cita por WhatsApp</h2>
            <p className="text-lg text-gray-600">Completa el formulario y te enviaremos los detalles de tu cita por WhatsApp</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
                  placeholder="Tu número de WhatsApp"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
                  placeholder="Tu código postal"
                />
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Motivo de consulta</label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="implantes">Implantes</option>
                  <option value="ortodincia">Ortodoncia</option>
                  <option value="estetica">Estética dental</option>
                  <option value="revision">Revisión general</option>
                  <option value="otro">Otro tratamiento</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Horario preferido para la cita</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="manana">Por la mañana</option>
                  <option value="tarde">Por la tarde</option>
                </select>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Solicitar cita por WhatsApp"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
