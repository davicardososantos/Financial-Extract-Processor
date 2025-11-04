'use client';

interface InfoItemProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export function InfoItem({ icon, content, className = '' }: InfoItemProps) {
  return (
    <div className={`flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 ${className}`}>
      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        {content}
      </div>
    </div>
  );
}