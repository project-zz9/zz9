import { DemoImage } from "~/assets/images";
import BackgroundLayer from "../BackgroundLayer";

interface IDemoBackgroundProps {
  uri?: string;
}

function DemoBackground({ uri = DemoImage }: IDemoBackgroundProps) {
  return (
    <BackgroundLayer>
      <img
        src={uri}
        alt=""
        style={{
          opacity: 0.5,
        }}
      />
    </BackgroundLayer>
  );
}

export default DemoBackground;
