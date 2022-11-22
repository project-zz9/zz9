import { IconButton } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { Fragment } from "react";
import { ToggleRight } from "react-feather";
import styled from "styled-components";
import { logos } from "~/assets/images";

interface IQRCodeCardProps {
  uuid: string;
  onFlip: () => void;
}

function QRCodeCard({ uuid, onFlip }: IQRCodeCardProps) {
  return (
    <Fragment>
      <CardHeaderFrame>
        <LogoFrame>
          <Logo src={logos.Logo2W} alt="logo" />
        </LogoFrame>
        <IconFrame>
          <IconButton
            onClick={(e) => {
              onFlip();
              e.stopPropagation();
            }}
          >
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
    </Fragment>
  );
}

export default QRCodeCard;

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
  position: relative;
  button {
    position: absolute;
    top: -1rem;
    right: -1rem;
    padding: 1.5rem;
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
