'use client';

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  badges?: React.ReactNode;
  avatar?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CardHeader({ 
  title, 
  subtitle, 
  badges, 
  avatar, 
  onEdit, 
  onDelete 
}: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-2">
          {avatar}
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-gray-900 truncate">{title}</h3>
            {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        {badges && <div className="flex items-center space-x-2">{badges}</div>}
      </div>
      
      {(onEdit || onDelete) && (
        <div className="flex space-x-1 ml-4 flex-shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="Editar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Excluir"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}