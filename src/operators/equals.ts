import type { Node, Stringable } from "../types.js";

const defaultSeparator = "==";

type EqualsValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function equals(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<EqualsValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "equals",
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

export { equals };
