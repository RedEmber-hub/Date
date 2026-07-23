import { Button } from './components/Button';
import './App.scss';
import { RadioButton } from './components/RadioButton';
import { useState } from 'react';
import { Textarea } from './components/Textarea';

export default function App() {
  const [variant, setVariant] = useState('');

  const radioButtons = [
    {
      icon: '☕',
      text: 'Кофе',
      value: 'Кофе',
    },
    {
      icon: '🍝',
      text: 'Итальянская',
      value: 'Итальянская',
    },
    {
      icon: '🍣',
      text: 'Суши',
      value: 'Суши',
    },
  ];

  return (
    <div className="app__button">
      <Button variant="primary">Да</Button>
      <Button variant="secondary">Нет</Button>

      {radioButtons.map(({ icon, text, value }, index) => (
        <RadioButton
          key={index}
          value={value}
          checked={variant === value}
          icon={icon}
          text={text}
          onChange={setVariant}
        />
      ))}

      <Textarea placeholder="Я немного опоздаю..." maxLength={24} />
    </div>
  );
}
