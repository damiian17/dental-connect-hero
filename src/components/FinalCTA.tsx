import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const FinalCTA = () => {
  const {
    elementRef,
    isIntersecting
  } = useIntersectionObserver({
    threshold: 0.3
  });
  return;
};
export default FinalCTA;