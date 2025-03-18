
import { useEffect, useState } from 'react';

export const defaultConfig = {
  duration: 500,
  delay: 0,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

export const useInView = (
  ref,
  options = { threshold: 0.1 }
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isInView;
};

export const createTransition = (
  properties,
  config = defaultConfig
) => {
  const { duration = 500, delay = 0, easing = 'cubic-bezier(0.16, 1, 0.3, 1)' } = config;
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  
  return `${props} ${duration}ms ${easing} ${delay}ms`;
};

export const staggerChildren = (
  baseDelay = 50,
  count
) => {
  return Array.from({ length: count }, (_, i) => baseDelay * i);
};
