
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { formatPhoneNumber } from '@/utils/phoneUtils';

export interface ContactFormData {
  name: string;
  phone: string;
  location: string;
  reason: string;
  time: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useContactForm(): UseContactFormReturn {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    location: '',
    reason: '',
    time: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Save data to Supabase
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
      
      // 2. Send data to webhook (non-blocking)
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
        // Continue even if webhook fails
      }

      // 3. Show success message
      toast({
        title: "¡Enviado con éxito!",
        description: "Te enviaremos los detalles de tu cita por WhatsApp.",
      });
      
      // 4. Prepare WhatsApp message
      const mensajeWhatsApp = `Hola, soy ${formData.name}. Me gustaría solicitar una cita para ${formData.reason} en horario de ${formData.time === 'manana' ? 'mañana' : 'tarde'}.`;
      const numeroFormateado = formatPhoneNumber(formData.phone);
      
      // 5. Reset form
      setFormData({
        name: '',
        phone: '',
        location: '',
        reason: '',
        time: ''
      });
      
      // 6. Redirect to WhatsApp after delay
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

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit
  };
}
