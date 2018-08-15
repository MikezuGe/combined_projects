import React from 'react';
import styled from 'styled-components';


const GrayoutContainer = styled.div`
  position: absolute;
  background: gray;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


class ActionModal extends React.Component {

  render () {
    return (
      <GrayoutContainer>
        <Container>
          In middle
        </Container>
      </GrayoutContainer>
    )
  }

}


export default ActionModal;
