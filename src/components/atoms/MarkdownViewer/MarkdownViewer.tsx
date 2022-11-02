import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMarkdownViewerProps {
  markdown: string;
}

function MarkdownViewer({ markdown }: IMarkdownViewerProps) {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
}

export default MarkdownViewer;
