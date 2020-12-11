import React, { useState } from 'react';
import { HStack, Input as FormInput, Button } from '@chakra-ui/react';

interface IInputInterface {
  style: any,
  onSearch: Function
}

const Input: React.FC<IInputInterface> = ({ style, onSearch }) => {
  const [state, setState] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    onSearch(state);
  }

  return (
    <form style={{ width: '100%', backgroundColor: 'white', ...style }} onSubmit={handleSubmit}>
      <HStack padding='.3em' borderBottom='1px solid lightgrey'>
        <FormInput
          border='none'
          focusBorderColor='none'
          placeholder='Search for a video'
          value={state}
          onInput={(e: any) => setState(e.target.value)} />
        <Button type='submit' colorScheme='red'>Search</Button>
      </HStack>
    </form>
  )
}

export default Input;
