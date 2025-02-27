
import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = true,
}: IntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (isElementIntersecting) {
          setIsIntersecting(true);
          setHasAnimated(true);
          
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        } else {
          if (!freezeOnceVisible) {
            setIsIntersecting(false);
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);
  
  return { elementRef, isIntersecting, hasAnimated };
}

export default useIntersectionObserver;
