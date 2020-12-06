import React, { useState } from 'react';
import styled from 'styled-components';

interface IInputInterface {
  onSearch: Function
}

const Input: React.FC<IInputInterface> = ({ onSearch }) => {
  const [state, setState] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    onSearch(state);
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <InputBox
        type='textarea'
        placeholder='Search for a video'
        value={state}
        onInput={(e: any) => setState(e.target.value)} />
      <InputButton>Search</InputButton>
    </InputForm>
  )
}

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
`;

const InputBox = styled.input`
  flex-grow: 1;
  border: none;
  padding: .5em;

  &:focus {
    outline: none;
  }
`;

const InputButton = styled.button`
  border: none;
  border-radius: 1em;
  padding: .5em 1em;
  margin: .5em;
  background-color: lightblue;
  color: white;
`;

export default Input;
