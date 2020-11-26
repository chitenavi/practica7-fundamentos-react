import styled, { keyframes } from 'styled-components';
import T from 'prop-types';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoaderStyled = styled.div`
  margin: 60px auto;
  border: ${({ size }) => (size === 'medium' ? '0.4rem' : '0.2rem')} solid
    rgba(68, 197, 13, 0.2);
  border-top: ${({ size }) => (size === 'medium' ? '0.4rem' : '0.2rem')} solid
    #8dc973;
  border-radius: 50%;
  width: ${({ size }) => (size === 'medium' ? '5rem' : '2.5rem')};
  height: ${({ size }) => (size === 'medium' ? '5rem' : '2.5rem')};
  animation: ${spin} 0.6s linear infinite;
`;

LoaderStyled.propTypes = {
  size: T.string,
};

export default LoaderStyled;
