import { lazy, useState } from "react";
import { QrReader } from "react-qr-reader";

function QrScanner() {
  const [data, setData] = useState("No result");
  return (
    <div style={{ width: "350px" }}>
      <QrReader
        videoId="video"
        constraints={{ facingMode: "user" }}
        scanDelay={500}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }

          if (!!error) {
            console.log(error.message);
          }
        }}
      />
      <p>{data}</p>
    </div>
  );
}

export default QrScanner;
