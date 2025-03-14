
import React from 'react';
import { Button } from '../ui/button';
import FormField from './FormField';
import { useContactForm, type ContactFormData } from '@/hooks/useContactForm';

const reasonOptions = [
  { value: 'implantes', label: 'Implantes' },
  { value: 'ortodincia', label: 'Ortodoncia' },
  { value: 'estetica', label: 'Estética dental' },
  { value: 'revision', label: 'Revisión general' },
  { value: 'otro', label: 'Otro tratamiento' },
];

const timeOptions = [
  { value: 'manana', label: 'Por la mañana' },
  { value: 'tarde', label: 'Por la tarde' },
];

const ContactFormContent = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="name"
          name="name"
          label="Nombre completo"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        
        <FormField
          id="phone"
          name="phone"
          label="WhatsApp"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Tu número de WhatsApp"
        />
        
        <FormField
          id="location"
          name="location"
          label="Código postal"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Tu código postal"
        />
        
        <FormField
          id="reason"
          name="reason"
          label="Motivo de consulta"
          type="select"
          value={formData.reason}
          onChange={handleChange}
          options={reasonOptions}
        />
        
        <FormField
          id="time"
          name="time"
          label="Horario preferido para la cita"
          type="select"
          value={formData.time}
          onChange={handleChange}
          options={timeOptions}
        />
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
  );
};

export default ContactFormContent;
