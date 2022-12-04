import { keyframes } from "styled-components";

export const glow = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const shakeX = keyframes`
  0% {
    transform: translateX(-0.25rem);
  }

  50% {
    transform: translateX(0rem);
  }

  100% {
    transform: translateX(0.25rem);
  }
`;
