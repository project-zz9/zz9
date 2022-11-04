import { useEffect, useState } from "react";
import { firestore } from "~/app/firesore";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Invitation() {
  // Firebase Type 정의 가져올 필요 있음
  const [great, setGreat] = useState<string | null>(null);

  useEffect(() => {
    const bucket = firestore.collection("data");
    bucket
      .doc("init_database")
      .get()
      .then((doc: any) => {
        const data = doc.data();
        setGreat(JSON.stringify(data, null, "\t"));
      });
  }, []);
  return (
    <>
      <DemoForeground title="Invitation" color="green" />
      <pre>{great}</pre>
      <MonotonicBackground />
    </>
  );
}

export default Invitation;
