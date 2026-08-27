import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=ge=";

type GreaterOrEqualValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function greaterOrEqual(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<GreaterOrEqualValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "greater-or-equal",
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

export { greaterOrEqual };
