
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

  const formatPhoneNumber = (phone: string): string => {
    // Eliminar caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Asegurarse de que empieza con el código de país para España
    if (cleaned.startsWith('34')) {
      return cleaned;
    } else {
      return `34${cleaned}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Guardar datos en Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);
      
      if (error) {
        console.error('Error submitting form to Supabase:', error);
        toast({
          title: "Error",
          description: "Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // 2. Enviar datos al webhook (sin bloquear el proceso principal)
      try {
        fetch('https://primary-production-dec0c.up.railway.app/webhook-test/ba9346bd-dcc5-42b0-8e6f-223448d9376c', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).catch(webhookError => {
          console.error('Error al enviar datos al webhook:', webhookError);
        });
      } catch (webhookError) {
        console.error('Error al intentar enviar datos al webhook:', webhookError);
        // Continuamos con el proceso incluso si hay un error con el webhook
      }

      // 3. Mostrar mensaje de éxito
      toast({
        title: "¡Enviado con éxito!",
        description: "Te enviaremos los detalles de tu cita por WhatsApp.",
      });
      
      // 4. Preparar mensajes para WhatsApp
      const mensajeWhatsApp = `Hola, soy ${formData.name}. Me gustaría solicitar una cita para ${formData.reason} en horario de ${formData.time === 'manana' ? 'mañana' : 'tarde'}.`;
      const numeroFormateado = formatPhoneNumber(formData.phone);
      
      // 5. Resetear el formulario
      setFormData({
        name: '',
        phone: '',
        location: '',
        reason: '',
        time: ''
      });
      
      // 6. Redireccionar a WhatsApp después de un breve retraso
      setTimeout(() => {
        const whatsappURL = `https://wa.me/34623378691?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.location.href = whatsappURL;
        setIsLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error general:', err);
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
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
