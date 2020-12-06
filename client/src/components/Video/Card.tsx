import React from 'react';
import styled from 'styled-components';

interface ICardInterface {
  id: string,
  thumbnail: string,
  title: string,
  onVideoChange: Function
}

const Card: React.FC<ICardInterface> = ({ id, thumbnail, title, onVideoChange }) => {
  return (
    <CardDiv className='card' onClick={() => onVideoChange(id)}>
      <CardImage style={{ backgroundImage: `url(${thumbnail})` }} />
      <CardContent>
        <p>{title}</p>
      </CardContent>
    </CardDiv>
  )
}

const CardDiv = styled.div`
  width: calc(25% - .5em);
  background-color: lightgrey;
  margin-bottom: .5em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 6em;
  background-position: center center;
  background-size: cover;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5em;

  p {
    margin-bottom: 0;
  }
`;

export default Card;
