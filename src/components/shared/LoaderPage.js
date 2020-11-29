import React from 'react';
import styled from 'styled-components';
import Loader from './LoaderStyled';

export const BackPage = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderPage = () => {
  return (
    <BackPage>
      <Loader size="medium" />
    </BackPage>
  );
};

export default LoaderPage;
