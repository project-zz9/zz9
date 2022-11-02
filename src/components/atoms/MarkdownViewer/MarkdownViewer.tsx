import ReactMarkdown from "react-markdown";

interface IMarkdownViewerProps {
  markdown: string;
}

function MarkdownViewer({ markdown }: IMarkdownViewerProps) {
  return <ReactMarkdown children={markdown} />;
}

export default MarkdownViewer;
