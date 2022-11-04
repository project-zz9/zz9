import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import stringWidth from "string-width";
import styled from "styled-components";
interface IMarkdownViewerProps {
  markdown: string;
}

function MarkdownViewer({ markdown }: IMarkdownViewerProps) {
  return (
    <MarkdownViewerFrame>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[
          [remarkGfm, { singleTilde: false, stringLength: stringWidth }],
        ]}
      />
    </MarkdownViewerFrame>
  );
}

export default MarkdownViewer;

const MarkdownViewerFrame = styled.div`
  p {
    font-size: 0.9rem;
  }
  table {
    width: 100%;

    thead {
      background-color: black;
      th {
        color: white;
        min-width: 5rem;
        font-size: 0.85rem;
      }
    }
    tbody {
      background-color: #e6e6e6;
      td {
        font-size: 0.75rem;
      }
    }
  }
`;
