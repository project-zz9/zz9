import BackgroundLayer from "../BackgroundLayer";

interface IDemoBackgroundProps {
  uri?: string;
}

function DemoBackground({ uri }: IDemoBackgroundProps) {
  return (
    <BackgroundLayer>
      {uri && (
        <img
          src={uri}
          alt=""
          style={{
            opacity: 0.5,
          }}
        />
      )}
    </BackgroundLayer>
  );
}

export default DemoBackground;
