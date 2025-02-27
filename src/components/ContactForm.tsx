
import { useState } from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    reason: '',
    time: '',
  });
  
  const { elementRef: formRef, isIntersecting: formVisible } = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the actual form submission logic
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      phone: '',
      location: '',
      reason: '',
      time: '',
    });
    // Show success message
    alert('¡Gracias! Te contactaremos pronto.');
  };
  
  return (
    <section id="contacto" className="section-padding bg-dental-primary/5">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">¿Prefieres que te llamemos?</h2>
              <p className="text-gray-600 mb-6">
                Déjanos tus datos y nos pondremos en contacto contigo lo antes posible para ayudarte a encontrar la clínica dental perfecta.
              </p>
              
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-dental-primary/10 mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-dental-primary/10 flex items-center justify-center mr-4">
                    <span className="text-dental-primary font-bold">1</span>
                  </div>
                  <p>Te llamamos en el horario que prefieras</p>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-dental-primary/10 flex items-center justify-center mr-4">
                    <span className="text-dental-primary font-bold">2</span>
                  </div>
                  <p>Te recomendamos las mejores clínicas</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-dental-primary/10 flex items-center justify-center mr-4">
                    <span className="text-dental-primary font-bold">3</span>
                  </div>
                  <p>Agendamos tu cita si así lo deseas</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-lg bg-dental-secondary/10 text-dental-secondary">
                <p className="text-sm">
                  <strong>Nota:</strong> Este servicio es completamente gratuito para ti.
                </p>
              </div>
            </div>
            
            <div
              ref={formRef as React.RefObject<HTMLDivElement>}
              className={cn(
                "transition-all duration-700",
                formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold mb-6 text-center">Formulario de Contacto</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu nombre y apellidos"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Código postal / Ciudad
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu código postal o ciudad"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Motivo de consulta
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      value={formData.reason}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="revision">Revisión general</option>
                      <option value="limpieza">Limpieza dental</option>
                      <option value="ortodoncia">Ortodoncia</option>
                      <option value="implantes">Implantes dentales</option>
                      <option value="estetica">Estética dental</option>
                      <option value="urgencia">Urgencia dental</option>
                      <option value="otro">Otro motivo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Horario preferido para contacto
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="morning">Mañana (9:00 - 13:00)</option>
                      <option value="afternoon">Tarde (15:00 - 19:00)</option>
                      <option value="evening">Noche (19:00 - 21:00)</option>
                      <option value="any">Cualquier horario</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" className="w-full">
                    Quiero que me llamen
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
