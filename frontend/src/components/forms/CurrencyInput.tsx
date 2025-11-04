'use client';

import { useState, useEffect, useRef } from 'react';

interface CurrencyInputProps {
  id?: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function CurrencyInput({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  required = false,
  placeholder = "0,00",
  className = ''
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Gerar ID automático baseado no label
  const inputId = id || `currency-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const formatToCurrency = (num: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const parseFromCurrency = (str: string): number => {
    // Remove tudo que não é número
    const cleanValue = str.replace(/[^\d]/g, '');
    
    // Converte para número dividindo por 100 (para considerar os centavos)
    return parseFloat(cleanValue) / 100 || 0;
  };

  // Formata para exibição (com vírgula como separador decimal)
  const formatForDisplay = (num: number): string => {
    return num.toFixed(2).replace('.', ',');
  };

  // Converte string de display para número
  const parseFromDisplay = (str: string): number => {
    const cleanValue = str.replace(/[^\d,]/g, '');
    const numericValue = cleanValue.replace(',', '.');
    return parseFloat(numericValue) || 0;
  };

  useEffect(() => {
    setDisplayValue(formatToCurrency(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Salva a posição do cursor antes da atualização
    const cursorPosition = e.target.selectionStart || 0;
    
    // Remove formatação para processamento
    const unformattedValue = rawValue.replace(/[^\d]/g, '');
    
    if (unformattedValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }

    // Converte para número (considera como centavos)
    const numericValue = parseFloat(unformattedValue) / 100;
    
    // Formata para exibição
    const formattedValue = formatToCurrency(numericValue);
    
    setDisplayValue(formattedValue);
    onChange(numericValue);

    // Restaura a posição do cursor após a renderização
    setTimeout(() => {
      if (inputRef.current) {
        // Calcula nova posição do cursor
        let newCursorPosition = cursorPosition;
        
        // Se adicionou um caractere (aumentou o tamanho), ajusta a posição
        if (formattedValue.length > rawValue.length) {
          newCursorPosition += formattedValue.length - rawValue.length;
        }
        // Se removeu um caractere (diminuiu o tamanho), ajusta a posição
        else if (formattedValue.length < rawValue.length) {
          newCursorPosition -= rawValue.length - formattedValue.length;
        }
        
        inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const handleBlur = () => {
    // Garante formatação consistente ao sair do campo
    if (displayValue) {
      const numericValue = parseFromCurrency(displayValue);
      setDisplayValue(formatToCurrency(numericValue));
    }
  };

  const handleFocus = () => {
    // Seleciona todo o texto quando foca (opcional - melhora UX)
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números, backspace, delete e teclas de navegação
    if (!/[\d]|Backspace|Delete|ArrowLeft|ArrowRight|Tab|Enter/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          R$
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}