import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useField = (type, name) => {
  const [value, setValue] = useState('');

  const id = name;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue('');
  };

  return {
    id,
    type,
    name,
    value,
    onChange,
    clearValue,
  };
};
