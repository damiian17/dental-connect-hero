import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { trackPhoneCall } from '@/lib/supabase';
const FinalCTA = () => {
  const {
    elementRef,
    isIntersecting
  } = useIntersectionObserver({
    threshold: 0.3
  });
  const handlePhoneCall = () => {
    trackPhoneCall('footer_cta');
    window.location.href = 'tel:+12768007201';
  };
  return;
};
export default FinalCTA;