
import { FormEvent, ChangeEvent } from 'react';
import { Button } from '../ui/button';
import FormField from './FormField';
import { Loader2 } from 'lucide-react';
import { useContactForm, FormData } from '@/hooks/useContactForm';

const ContactFormContent = () => {
  const { formData, handleChange, handleSubmit, isSubmitting } = useContactForm();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="name"
          name="name"
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre"
          required
          value={formData.name}
          onChange={handleChange}
        />
        
        <FormField
          id="email"
          name="email"
          label="Correo electrónico"
          type="text"
          placeholder="tu@email.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
        
        <FormField
          id="phone"
          name="phone"
          label="Teléfono"
          type="tel"
          placeholder="+34 600 000 000"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        
        <FormField
          id="location"
          name="location"
          label="Ciudad"
          type="text"
          placeholder="Tu ciudad"
          value={formData.location}
          onChange={handleChange}
        />
        
        <FormField
          id="reason"
          name="reason"
          label="Motivo de consulta"
          type="select"
          value={formData.reason}
          onChange={handleChange}
          options={[
            { value: "", label: "Selecciona una opción" },
            { value: "revision", label: "Revisión general" },
            { value: "limpieza", label: "Limpieza bucal" },
            { value: "ortodoncia", label: "Ortodoncia" },
            { value: "implantes", label: "Implantes dentales" },
            { value: "estetica", label: "Estética dental" },
            { value: "urgencia", label: "Urgencia dental" },
            { value: "otros", label: "Otros tratamientos" }
          ]}
          required
        />
        
        <FormField
          id="time"
          name="time"
          label="Mejor horario para contacto"
          type="select"
          value={formData.time}
          onChange={handleChange}
          options={[
            { value: "", label: "Selecciona una opción" },
            { value: "manana", label: "Mañanas (9:00 - 13:00)" },
            { value: "tarde", label: "Tardes (16:00 - 20:00)" },
            { value: "cualquiera", label: "Cualquier horario" }
          ]}
          required
        />
      </div>
      
      <FormField
        id="message"
        name="message"
        label="Mensaje (opcional)"
        type="textarea"
        placeholder="Cuéntanos más sobre lo que necesitas..."
        value={formData.message}
        onChange={handleChange}
      />
      
      <Button 
        type="submit" 
        size="lg" 
        className="w-full py-6 text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar solicitud'
        )}
      </Button>
    </form>
  );
};

export default ContactFormContent;
