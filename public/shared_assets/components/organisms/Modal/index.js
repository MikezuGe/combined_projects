import React, { useState, useEffect, } from 'react';
import styled from 'styled-components';


const Grayout = styled.div`
position: fixed;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
visibility: ${({ active, }) => active ? 'visible' : 'hidden'};
background: rgba(128, 128, 128, ${({ active, }) => active ? 0.5 : 0.0});
transition: background ${({ theme, }) => theme.animateSlow}, visibility 0ms linear ${({ active, }) => active ? 0 : 500}ms;
`;

const StyledModal = styled.div`
position: relative;
top: ${({ active, }) => active ? 0 : -100}%;
transition: top ${({ theme, }) => theme.animateSlow} ease-out;
`;


let listener = () => {};
export const openModal = render => listener(render);


const Modal = () => {
  const [ active, setActive, ] = useState(false);
  const [ render, setRender, ] = useState(undefined);
  
  listener = render => {
    setActive(true);
    setRender(() => render);
  };

  const closeModal = () => {
    setActive(false);
    setTimeout(setRender, 500)
  };

  useEffect(() => {
    if (!active) {
      return;
    }
    const listener = ({ key, keyCode, }) =>
      (key === 'Escape' || keyCode === 27) && closeModal();
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [ active, ]);

  return (
    <Grayout
      active={active}
      onClick={closeModal}
    >
      <StyledModal
        active={active}
        onClick={e => e.stopPropagation()}
      >
        {render && render({ closeModal, })}
      </StyledModal>
    </Grayout>
  );
};


export default Modal;
