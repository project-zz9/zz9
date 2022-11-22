import { Fragment, useMemo } from "react";
import EmphasisText from "~/components/atoms/EmphasisText";
import { getKey } from "~/utils/crypto";

interface IMultiLineText {
  lines: EmphasisTextForm[];
  size?: `${number}rem` | `${number}vw`;
  color?: ColorCode;
  weight?: number | "bold";
  data?: Record<string, string>;
  margin?: "";
}

function MultiLineText({
  lines: rawLines,
  size,
  color,
  weight,
  data,
}: IMultiLineText) {
  const lines = useMemo(() => {
    return data
      ? rawLines.map((line) => {
          return line.map((span) => ({
            ...span,
            value: replacePrefix(span.value, data),
          }));
        })
      : rawLines;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawLines]);

  return (
    <Fragment>
      {lines.map((line: EmphasisTextForm, index: number) => (
        <EmphasisText
          key={getKey(index, ...line.map(({ value }) => value))}
          text={line}
          size={size}
          color={color}
          weight={weight}
        />
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
