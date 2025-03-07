import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { faqs } from '@/assets/mockData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return;
};
export default FAQ;