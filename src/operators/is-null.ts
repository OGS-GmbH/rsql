import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=isnull=";

type IsNullValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function isNull(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<IsNullValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "is-null",
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

export { isNull };
