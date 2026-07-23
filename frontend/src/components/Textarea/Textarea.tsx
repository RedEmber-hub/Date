import './Textarea.scss';
import type { TextareaProps } from './Textarea.type';

import { useId, useState } from 'react';

export default function Textarea({ maxLength, placeholder, onChange }: TextareaProps) {
  const [textLength, setTextLength] = useState(0);
  const id = useId();

  function _onChange(event: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) {
    const value = event?.target.value;

    onChange?.(value);
    setTextLength(value.length);
  }

  return (
    <div className="textarea">
      <textarea id={id} placeholder={placeholder} maxLength={maxLength} onChange={_onChange}></textarea>

      {maxLength && (
        <span className="textarea__counter">
          {textLength} / {maxLength}
        </span>
      )}
    </div>
  );
}
