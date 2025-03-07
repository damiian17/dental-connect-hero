import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
const Map = () => {
  const [postalCode, setPostalCode] = useState('');
  const {
    elementRef: titleRef,
    isIntersecting: titleVisible
  } = useIntersectionObserver();
  const {
    elementRef: mapRef,
    isIntersecting: mapVisible
  } = useIntersectionObserver({
    threshold: 0.1
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the actual search logic
    console.log('Searching for clinics near:', postalCode);
  };
  return;
};
export default Map;