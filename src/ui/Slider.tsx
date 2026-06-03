import type { InputHTMLAttributes } from 'react';

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
};

export function Slider({ className = '', label, ...props }: SliderProps) {
  return (
    <label className={`ui-field ${className}`.trim()}>
      <span className="ui-field__label">{label}</span>
      <input className="ui-slider" type="range" {...props} />
    </label>
  );
}
