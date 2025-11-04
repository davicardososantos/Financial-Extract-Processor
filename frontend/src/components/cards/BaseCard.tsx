'use client';

interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BaseCard({ children, className = '', onClick }: BaseCardProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}