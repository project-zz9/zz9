import { Divider, IconButton, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { ToggleLeft } from "react-feather";
import styled from "styled-components";
import { logos } from "~/assets/images";

interface IInformationCardProps {
  visitor: VisitorData;
  onFlip: () => void;
}

function InformationCard({ visitor, onFlip }: IInformationCardProps) {
  const { name, visitTime } = visitor;
  const [date, time] = useMemo(
    () => (visitTime ? visitTime.split(" ") : []),
    [visitTime]
  );
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
      <InformationFrame>
        <Typography color="#FFF" display="block" variant="body1">
          예약자
        </Typography>
        <Value>{name}</Value>
        <Divider color="#FFF" />
        <Typography color="#FFF" display="block" variant="body1">
          방문날짜
        </Typography>
        <Value>{date}</Value>
        <Divider color="#FFF" />
        <Typography color="#FFF" display="block" variant="body1">
          방문시간
        </Typography>
        <Value>{time}</Value>
        <Divider color="#FFF" />
        <Typography color="#FFF" display="block" variant="body1">
          전시장소
        </Typography>
        <Value>서울특별시 **구 **로 37 1층</Value>

        <MapFrame />
      </InformationFrame>
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

const InformationFrame = styled.div`
  & > p,
  hr {
    margin-top: 1.15vh;
    margin-bottom: 1.15vh;
  }
  & > p {
    font-weight: 500;
  }
`;

const Value = styled.p`
  font-size: 1.2rem;
  font-weight: bold !important;
`;

const MapFrame = styled.div`
  margin-top: 2vh;
  height: 15vh;
  background-color: red;
  border-radius: 10px;
`;
