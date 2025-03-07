import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
const ContactForm = () => {
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
      time: ''
    });
    // Show success message
    alert('¡Gracias! Te contactaremos pronto.');
  };
  return;
};
export default ContactForm;