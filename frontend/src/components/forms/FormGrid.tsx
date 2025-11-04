import { ReactNode } from 'react';

interface FormGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    mobile?: 1 | 2;
    desktop?: 1 | 2 | 3 | 4;
  };
  gap?: 'sm' | 'md' | 'lg';
}

export function FormGrid({ 
  children, 
  className = '',
  cols = { mobile: 1, desktop: 2 },
  gap = 'md'
}: FormGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const gridColsClasses = {
    mobile: {
      1: 'grid-cols-1',
      2: 'grid-cols-2'
    },
    desktop: {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4'
    }
  };

  return (
    <div className={`
      grid 
      ${gridColsClasses.mobile[cols.mobile!]} 
      ${gridColsClasses.desktop[cols.desktop!]} 
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  );
}