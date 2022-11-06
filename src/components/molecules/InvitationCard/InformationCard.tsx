import { IconButton } from "@mui/material";
import { Fragment } from "react";
import { ToggleLeft } from "react-feather";
import styled from "styled-components";
import { logos } from "~/assets/images";

interface IInformationCardProps {
  visitor: VisitorData;
  onFlip: () => void;
}

function InformationCard({ visitor, onFlip }: IInformationCardProps) {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default InformationCard;

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
