import { IconButton } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { Fragment } from "react";
import { ToggleRight } from "react-feather";
import styled from "styled-components";
import { logos } from "~/assets/images";
import MultiLineText from "../MultiLineText";

interface IQRCodeCardProps {
  uuid: string;
  isVisited: boolean;
  onFlip: () => void;
}

function QRCodeCard({ uuid, isVisited, onFlip }: IQRCodeCardProps) {
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
        {isVisited ? (
          <MultiLineText
            lines={[[{ value: "지수의 지구에 입장을 완료했어요!" }]]}
            size="5vw"
            color="#FFF"
            weight="bold"
          />
        ) : (
          <Fragment>
            <QRcodeGuid>
              <MultiLineText
                lines={[
                  [{ value: "QR코드를 지수에게 보여주고" }],
                  [{ value: "전시에 입장해주세요." }],
                ]}
                size="5vw"
                color="#FFF"
                weight={500}
              />
            </QRcodeGuid>
            <QRCodeCanvas
              value={uuid}
              style={{
                height: "40vw",
                width: "40vw",
                outline: "10px solid #FFF",
              }}
            />
          </Fragment>
        )}
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
  text-align: center;
  margin: 7.5vw;
`;
