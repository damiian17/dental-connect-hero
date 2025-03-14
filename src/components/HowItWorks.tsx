import { MessageSquare, MapPin, Calendar } from 'lucide-react';
import { steps } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const IconMap: Record<string, any> = {
  MessageSquare: MessageSquare,
  MapPin: MapPin,
  Calendar: Calendar
};
const HowItWorks = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  return;
};
export default HowItWorks;