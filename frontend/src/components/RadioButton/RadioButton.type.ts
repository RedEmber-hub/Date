export interface RadioButtonProps<T> {
  text: string;
  icon: string;
  checked: boolean;
  value: T;
  direction?: 'vertical' | 'horizontal';
  onChange?: (value: T) => void;
}
