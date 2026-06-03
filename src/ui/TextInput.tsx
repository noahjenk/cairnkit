import type { InputHTMLAttributes } from 'react';

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  type?: 'email' | 'number' | 'password' | 'search' | 'text' | 'url';
};

export function TextInput({ className = '', label, type = 'text', ...props }: TextInputProps) {
  return (
    <label className={`ui-field ${className}`.trim()}>
      <span className="ui-field__label">{label}</span>
      <input className="ui-text-input" type={type} {...props} />
    </label>
  );
}
