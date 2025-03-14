import { Network, BadgePercent, PiggyBank, Clock } from 'lucide-react';
import { whyChooseUs } from '@/assets/mockData';
import { Card } from './ui/card';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const IconMap: Record<string, any> = {
  Network: Network,
  BadgePercent: BadgePercent,
  PiggyBank: PiggyBank,
  Clock: Clock
};
const WhyChooseUs = () => {
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  return;
};
export default WhyChooseUs;