import styled, { css } from "styled-components";
import { glow } from "~/assets/styles/keyframes";

interface IPhotoCardProps {
  source: string;
  shadow?: string;
  filter?: ColorCode;
  width?: `${number}vw`;
  activate?: boolean;
  blur?: boolean;
  onClick?: () => void;
}

function PhotoCard({
  source,
  shadow,
  filter,
  width,
  activate,
  blur,
  onClick,
}: IPhotoCardProps) {
  return (
    <Card width={width} blur={blur} onClick={onClick}>
      <Photo
        src={source}
        activate={activate}
        blur={blur}
        draggable={false}
        alt="photo"
      />
      {shadow && activate && (
        <Shadow src={shadow} filter={filter} draggable={false} alt="filter" />
      )}
    </Card>
  );
}

export default PhotoCard;

const Card = styled.div<{ width?: `${number}vw`; blur?: boolean }>`
  position: relative;
  width: ${({ width }) => width || "25vw"};
  ${({ blur }) =>
    blur &&
    css`
      filter: blur(3px);
    `}
`;

const Photo = styled.img<{ activate?: boolean; blur?: boolean }>`
  object-fit: cover;
  opacity: ${({ activate }) => (activate ? 1 : 0.5)};
  transition: opacity 500ms;
  height: 100%;
  width: 100%;
  pointer-events: none;
  ${({ blur }) =>
    blur &&
    css`
      filter: drop-shadow(0 0 0 #000);
    `}
`;

const Shadow = styled.img<{ activate?: boolean; filter?: ColorCode }>`
  object-fit: cover;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  animation: ${glow} 2s infinite linear alternate;
  filter: drop-shadow(0 0 0 ${({ filter }) => filter ?? "#FFF"});
  z-index: -1;
  pointer-events: none;
`;
