import './Button.scss';
import type { ButtonProps } from './Button.type';

export default function Button({ variant = 'primary', onClick, disabled, children }: ButtonProps) {
  return (
    <button className={`button button--${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
