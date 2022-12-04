import { css } from "styled-components";

export const overflowYScroll = css`
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
