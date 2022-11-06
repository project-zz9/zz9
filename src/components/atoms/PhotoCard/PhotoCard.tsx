import styled, { keyframes } from "styled-components";

interface IPhotoCardProps {
  source: string;
  shadow?: string;
  filter?: ColorCode;
  width?: `${number}vw`;
  activate?: boolean;
  onClick?: () => void;
}

function PhotoCard({
  source,
  shadow,
  filter,
  width,
  activate,
  onClick,
}: IPhotoCardProps) {
  return (
    <Card width={width} onClick={onClick}>
      <Photo activate={activate} src={source} draggable={false} alt="" />
      {shadow && activate && (
        <Shadow src={shadow} filter={filter} draggable={false} alt="" />
      )}
    </Card>
  );
}

export default PhotoCard;

const Card = styled.div<{ width?: `${number}vw` }>`
  position: relative;
  width: ${({ width }) => width || "25vw"};
`;

const Photo = styled.img<{ activate?: boolean }>`
  object-fit: cover;
  opacity: ${({ activate }) => (activate ? 1 : 0.5)};
  transition: opacity 500ms;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const glow = keyframes`
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
