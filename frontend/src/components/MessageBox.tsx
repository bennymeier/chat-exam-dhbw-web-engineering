import { useState } from 'react';
import { Textarea } from '@chakra-ui/react';

const MessageBox = () => {
  let [value, setValue] = useState('');

  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Here is a sample placeholder"
        size="sm"
      />
    </>
  );
};

export default MessageBox;
