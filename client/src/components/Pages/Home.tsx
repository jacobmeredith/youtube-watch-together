import React from 'react';
import CreateRoom from '../User/CreateRoom';

interface IHomeInterface {
  onSubmit: Function
}

const Home: React.FC<IHomeInterface> = ({ onSubmit }) => {
  return (
    <CreateRoom onSubmit={(e: any) => onSubmit(e)} />
  )
}

export default Home;
