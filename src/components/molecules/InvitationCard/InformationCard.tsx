import { IconButton } from "@mui/material";
import { Fragment } from "react";
import { ToggleLeft } from "react-feather";
import styled from "styled-components";
import { cardShadow, logos } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";

interface IInformationCardProps {
  visitor: VisitorData;
  source: string;
  filter: ColorCode;
  onFlip: () => void;
}

function InformationCard({
  visitor,
  source,
  filter,
  onFlip,
}: IInformationCardProps) {
  return (
    <Fragment>
      <PhotoCard
        source={source}
        shadow={cardShadow}
        width="90vw"
        filter={filter}
        activate
        blur
      />
      <CardOverlay>
        <CardHeaderFrame>
          <LogoFrame>
            <Logo src={logos.Logo2W} alt="logo" />
          </LogoFrame>
          <IconFrame>
            <IconButton onClick={onFlip}>
              <ToggleLeft />
            </IconButton>
          </IconFrame>
        </CardHeaderFrame>
      </CardOverlay>
    </Fragment>
  );
}

export default InformationCard;

const CardOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  padding: 5.5vw;
  inset: 0;
  color: #fff;
`;

const CardHeaderFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
const LogoFrame = styled.div`
  width: 25vw;
`;

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const IconFrame = styled.div`
  button {
    color: #fff;
  }
`;
