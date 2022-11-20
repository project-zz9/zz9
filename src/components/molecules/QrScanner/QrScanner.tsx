import { useState } from "react";
import QrScannerInput from "~/components/atoms/QrScannerInput";
import ViewFinder from "~/components/atoms/ViewFinder";

function QrScanner() {
  const [data, setData] = useState("");
  return (
    <div style={{ width: "350px" }}>
      <QrScannerInput setData={setData} ViewFinder={ViewFinder} />
    </div>
  );
}

export default QrScanner;
