import type { InputHTMLAttributes } from 'react';

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
};

export function Toggle({ className = '', label, ...props }: ToggleProps) {
  return (
    <label className={`ui-toggle ${className}`.trim()}>
      <input className="ui-toggle__input" type="checkbox" {...props} />
      <span className="ui-toggle__track" aria-hidden="true">
        <span className="ui-toggle__thumb" />
      </span>
      <span className="ui-toggle__label">{label}</span>
    </label>
  );
}
