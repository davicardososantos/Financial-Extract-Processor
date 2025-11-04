interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  isLoading = false,
  className = ''
}: FormSelectProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled || isLoading ? 'bg-gray-100' : ''}`}
        disabled={disabled || isLoading}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isLoading && <p className="text-gray-500 text-sm mt-1">Carregando...</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}