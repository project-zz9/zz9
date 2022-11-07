import { Divider, IconButton, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { ToggleLeft } from "react-feather";
import styled from "styled-components";
import { logos } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";

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
        <MapFrame>
          <MonotonicButton
            color="secondary"
            onClick={() => {
              window.location.href =
                "https://map.naver.com/v5/search/%EA%B7%B8%EB%A6%B0%ED%8C%A9%ED%86%A0%EB%A6%AC?c=14148876.9034780,4489349.1064442,16.1,0,0,0,dh";
            }}
          >
            지도 바로가기
          </MonotonicButton>
        </MapFrame>
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
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
