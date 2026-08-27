import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=gt=";

type GreaterValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function greater(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<GreaterValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "greater",
    value: {
      column: columnStr,
      rawColumn: column,
      query: queryStr,
      rawQuery: query,
      separator: separatorStr,
      rawSeparator: separator
    },
    toString() {
      return columnStr + separatorStr + queryStr;
    }
  };
}

export { greater };
