import { Formatters } from '@/lib';

interface FormattedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type: 'cpf' | 'telefone';
  className?: string;
}

export function FormattedInput({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  type,
  className = ''
}: FormattedInputProps) {
  const handleChange = (rawValue: string) => {
    const valueLimpa = rawValue.replace(/\D/g, '');
    onChange(valueLimpa);
  };

  const formatValue = (value: string) => {
    if (!value) return '';
    
    switch (type) {
      case 'cpf':
        return Formatters.formatarCPF(value);
      case 'telefone':
        return Formatters.formatarTelefone(value);
      default:
        return value;
    }
  };

  const getMaxLength = () => {
    switch (type) {
      case 'cpf':
        return 14; // 000.000.000-00
      case 'telefone':
        return 15; // (00) 00000-0000
      default:
        return undefined;
    }
  };

  const getDefaultPlaceholder = () => {
    switch (type) {
      case 'cpf':
        return '000.000.000-00';
      case 'telefone':
        return '(00) 00000-0000';
      default:
        return '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <input
        type="text"
        value={formatValue(value)}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={getMaxLength()}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder || getDefaultPlaceholder()}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}