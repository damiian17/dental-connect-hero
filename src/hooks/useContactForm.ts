
import { useState } from "react";
import { formatPhoneNumber } from "@/utils/phoneUtils";
import { useToast } from "@/hooks/use-toast";

export interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  postalCode: string;
  city: string;
  serviceType: string;
  preferredContact: string;
  acceptTerms: boolean;
}

export const useContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
    postalCode: "",
    city: "",
    serviceType: "general",
    preferredContact: "whatsapp",
    acceptTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let processedValue = value;

    if (name === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: processedValue,
      });
    }
  };

  const redirectToWhatsApp = (formData: FormData) => {
    const message = `Hola, soy ${formData.name} y estoy interesado en recibir información sobre servicios de ${formData.serviceType}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    // Format phone to international format (remove any non-digit characters and add country code if needed)
    const phoneForWhatsApp = formData.phone.replace(/\D/g, "");
    const whatsappURL = `https://wa.me/34622496475?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://primary-production-dec0c.up.railway.app/webhook-test/ba9346bd-dcc5-42b0-8e6f-223448d9376c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast({
          title: "Formulario enviado correctamente",
          description: "Nos pondremos en contacto contigo pronto",
        });

        // If preferred contact is WhatsApp, redirect to WhatsApp
        if (formData.preferredContact === "whatsapp") {
          redirectToWhatsApp(formData);
        }

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          postalCode: "",
          city: "",
          serviceType: "general",
          preferredContact: "whatsapp",
          acceptTerms: false,
        });
      } else {
        toast({
          title: "Error al enviar el formulario",
          description: "Por favor, inténtalo de nuevo más tarde",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error al enviar el formulario",
        description: "Por favor, inténtalo de nuevo más tarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};

export default useContactForm;
