
import { useState, ChangeEvent, FormEvent } from 'react';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  reason: string;
  time: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    reason: '',
    time: '',
    message: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submissionData = {
        ...formData,
        source: 'website'
      };

      // Send data to webhook
      const response = await fetch(
        'https://primary-production-dec0c.up.railway.app/webhook-test/ba9346bd-dcc5-42b0-8e6f-223448d9376c',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submissionData)
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Build WhatsApp URL with form data
      const whatsappText = encodeURIComponent(
        `Hola, soy ${formData.name}. Estoy interesado/a en una consulta dental para ${formData.reason}. Prefiero ser contactado/a en ${formData.time}. Información adicional: ${formData.message}`
      );
      
      const whatsappUrl = `https://wa.me/34642419692?text=${whatsappText}`;
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        reason: '',
        time: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting
  };
};

export default useContactForm;
