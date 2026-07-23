import { useId } from 'react';
import './RadioButton.scss';
import type { RadioButtonProps } from './RadioButton.type';

import { Check } from 'lucide-react';

export default function RadioButton<T>({
  icon,
  text,
  checked,
  direction = 'vertical',
  value,
  onChange,
}: RadioButtonProps<T>) {
  const id = useId();

  return (
    <label htmlFor={id} className={`radio-button ${checked ? 'radio-button--checked' : ''}`}>
      <input type="radio" id={id} className="visually-hidden" checked={checked} onChange={() => onChange?.(value)} />

      <div className="radio-button__checked-icon">
        <Check color="#ffffff" size={9} />
      </div>

      <div className={`radio-button__content ${direction}`}>
        <div className="radio-button__slot-icon">{icon}</div>
        <div className="radio-button__slot-text">{text}</div>
      </div>
    </label>
  );
}
