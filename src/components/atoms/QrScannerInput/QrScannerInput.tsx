import { IconButton } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { ToggleLeft, ToggleRight } from "react-feather";
import { QrReader } from "react-qr-reader";
import styled from "styled-components";
const enum CameraMode {
  USER = "user",
  ENVIRONMENT = "environment",
}

interface IQrScannerInputs {
  setData: (value: string | ((value: string) => string)) => void;
  ViewFinder?: FC<any>;
}

function QrScannerInput({ setData, ViewFinder }: IQrScannerInputs) {
  const [mode, setMode] = useState(CameraMode.USER);
  const toggleMode = useCallback(() => {
    setMode((prev) =>
      prev === CameraMode.USER ? CameraMode.ENVIRONMENT : CameraMode.USER
    );
  }, []);
  const QrReaderWrapper = useCallback(
    () => (
      <QrReader
        {...(ViewFinder ? { ViewFinder } : {})}
        videoId="video"
        constraints={{ facingMode: mode }}
        scanDelay={500}
        onResult={(result) => {
          if (!!result) {
            setData(result.getText());
          }
        }}
        videoStyle={{
          backgroundColor: "black",
        }}
      />
    ),
    [ViewFinder, mode, setData]
  );

  return (
    <RootFrame>
      <ButtonFrame>
        <IconButton onClick={toggleMode}>
          {mode === CameraMode.USER ? (
            <ToggleLeft color="white" />
          ) : (
            <ToggleRight color="white" />
          )}
        </IconButton>
      </ButtonFrame>
      <ReaderFrame>
        <QrReaderWrapper />
      </ReaderFrame>
    </RootFrame>
  );
}

export default QrScannerInput;

const RootFrame = styled.div`
  position: relative;
  pointer-events: none;
`;

const ReaderFrame = styled.div`
  z-index: -1;
`;

const ButtonFrame = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 2.5%;
  z-index: 1;
  pointer-events: all;
`;
