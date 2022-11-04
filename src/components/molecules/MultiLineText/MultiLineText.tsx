import { Fragment, useMemo } from "react";
import SubTitleLine from "~/components/atoms/SubTitleLine";
import TitleLine from "~/components/atoms/TitleLine";

interface IMultiLineText {
  type: "title" | "subTitle";
  lines: string | string[];
  data?: Record<string, string>;
}

function MultiLineText({ type, lines: _lines_, data }: IMultiLineText) {
  const lines = Array.isArray(_lines_) ? _lines_ : [_lines_];
  const Line = useMemo(
    () => (type === "title" ? TitleLine : SubTitleLine),
    [type]
  );
  return (
    <Fragment>
      {lines
        .map((line: string) => replacePrefix(line, data || {}))
        .map((line: string, index: number) => (
          <Line key={`${index}::${line}`}>{line}</Line>
        ))}
    </Fragment>
  );
}

export default MultiLineText;

function replacePrefix(line: string, record: Record<string, string>): string {
  return line.replace(/%[a-zA-Z]*%/, (target) => {
    return record[target.replace(/%/g, "")] ?? target;
  });
}
