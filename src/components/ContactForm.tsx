
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import ContactFormContent from './contact/ContactFormContent';

const ContactForm = () => {
  const {
    elementRef: formRef,
    isIntersecting: formVisible
  } = useIntersectionObserver({
    threshold: 0.1
  });

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
          
          <ContactFormContent />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
