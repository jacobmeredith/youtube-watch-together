import React from 'react';

interface IModalInterface {
  isOpen: boolean
}

const Modal: React.FC<IModalInterface> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal modal--open'>
      {children}
    </div>
  )
}

export default Modal;
