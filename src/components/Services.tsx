import { CalendarCheck, ListChecks, CirclePlus, Baby, Smile, Zap, Activity, AlertTriangle } from 'lucide-react';
import { services } from '@/assets/mockData';
import { Card } from './ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const IconMap: Record<string, any> = {
  Tooth: CalendarCheck,
  Layers: ListChecks,
  PlusCircle: CirclePlus,
  Baby: Baby,
  Smile: Smile,
  ZapOff: Zap,
  Scanner: Activity,
  AlertTriangle: AlertTriangle
};
const Services = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  return;
};
export default Services;