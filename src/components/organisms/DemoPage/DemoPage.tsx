interface IDemoPage {
  title: string;
  body?: string;
  color?: string;
}

function DemoPage({ title, body, color }: IDemoPage) {
  return (
    <div style={color ? { backgroundColor: color } : {}}>
      <h1>{title}</h1>
      <pre>{body}</pre>
    </div>
  );
}

export default DemoPage;
