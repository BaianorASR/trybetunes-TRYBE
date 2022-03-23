import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const SH1 = styled.h1`
  width: 100vw;
  height: 100vh;
  bottom: 0;
  left: 0;
  position: fixed;
  backdrop-filter: blur(3px);
  font-size: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// fonte do Loading https://loading.io/css/
const LdsRing = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SLoadingDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 80px;
    height: 80px;
    margin: 8px;
    border: 6px solid var(--yellow);
    border-radius: 50%;
    animation: ${LdsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--yellow) transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loading: React.FC = () => (
  <SH1>
    Carregando...
    <SLoadingDiv className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </SLoadingDiv>
  </SH1>
);

export default memo(Loading);
