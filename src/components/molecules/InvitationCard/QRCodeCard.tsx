import { IconButton } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { ToggleRight } from "react-feather";
import styled from "styled-components";
import { cardShadow, logos } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";

interface IQRCodeCardProps {
  uuid: string;
  source: string;
  filter: ColorCode;
  onFlip: () => void;
}

function QRCodeCard({ uuid, source, filter, onFlip }: IQRCodeCardProps) {
  return (
    <Card>
      <PhotoCard
        source={source}
        shadow={cardShadow}
        width="90vw"
        filter={filter}
        activate
        onClick={() => {}}
      />
      <CardOverlay>
        <CardHeaderFrame>
          <LogoFrame>
            <Logo src={logos.Logo2W} alt="logo" />
          </LogoFrame>
          <IconFrame>
            <IconButton onClick={onFlip}>
              <ToggleRight />
            </IconButton>
          </IconFrame>
        </CardHeaderFrame>
        <QRCodeFrame>
          <QRcodeGuid>
            <div>QR코드를 지수에게 보여주고</div>
            <div>전시에 입장해주세요.</div>
          </QRcodeGuid>
          <QRCodeCanvas
            value={uuid}
            style={{
              height: "40vw",
              width: "40vw",
              outline: "10px solid #FFF",
            }}
          />
        </QRCodeFrame>
      </CardOverlay>
    </Card>
  );
}

export default QRCodeCard;

const Card = styled.div`
  position: relative;
`;

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

const QRCodeFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vw;
`;
const QRcodeGuid = styled.div`
  font-size: 5vw;
  font-weight: 500;
  text-align: center;
  margin: 7.5vw;
`;
