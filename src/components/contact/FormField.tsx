
import React from 'react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'tel' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: Array<{value: string, label: string}>;
}

const FormField = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = true,
  options = []
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
        >
          <option value="">Selecciona una opción</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dental-primary focus:border-transparent"
        />
      )}
    </div>
  );
};

export default FormField;
