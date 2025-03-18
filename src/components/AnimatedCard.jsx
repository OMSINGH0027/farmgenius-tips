
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';

export const AnimatedCard = ({
  children,
  index = 0,
  className,
  animationDelay = 0,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  const baseDelay = 100;
  const delay = animationDelay + (index * baseDelay);
  
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl p-6 border border-border/50 bg-card shadow-soft',
        'transform transition-all duration-700',
        'hover:shadow-medium hover:-translate-y-1 hover:border-primary/20',
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const GlassCard = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6 border border-white/20 shadow-soft backdrop-blur-md',
        'transform transition-all duration-300',
        'hover:shadow-medium hover:-translate-y-1 hover:border-white/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
