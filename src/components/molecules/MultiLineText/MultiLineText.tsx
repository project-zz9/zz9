import { Fragment, useMemo } from "react";
import { SEPARATOR } from "~/app/constant";
import EmphasisText from "~/components/atoms/EmphasisText";

interface IMultiLineText {
  lines: EmphasisTextForm[];
  size?: `${number}rem`;
  color?: ColorCode;
  weight?: number | "bold";
  data?: Record<string, string>;
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
          key={`${index}${SEPARATOR}${line}`}
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
