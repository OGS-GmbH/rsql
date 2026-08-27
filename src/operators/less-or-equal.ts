import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=le=";

type LessOrEqualValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function lessOrEqual(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<LessOrEqualValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "less-or-equal",
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

export { lessOrEqual };
