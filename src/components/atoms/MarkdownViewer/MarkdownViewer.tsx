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
  table {
    width: 100%;

    thead {
      background-color: gray;
      th {
        min-width: 5rem;
        font-size: 0.85rem;
      }
    }
    tbody {
      background-color: lightgray;
      td {
        font-size: 0.75rem;
      }
    }
  }
`;
