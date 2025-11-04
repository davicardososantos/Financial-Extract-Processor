'use client';

import { ReactNode } from 'react';

interface BaseFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitError?: string;
  isEdit?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function BaseForm({
  children,
  onSubmit,
  onCancel,
  isLoading = false,
  submitError = '',
  isEdit = false,
  maxWidth = '2xl'
}: BaseFormProps) {

  return (
    <form onSubmit={onSubmit} className={`space-y-6`}>
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {submitError}
        </div>
      )}

      {children}

      {/* Botões Padronizados */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Salvando...
            </div>
          ) : isEdit ? (
            'Atualizar'
          ) : (
            'Criar'
          )}
        </button>
      </div>
    </form>
  );
}