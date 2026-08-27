import type { Node, Stringable } from "../types.js";

const defaultSeparator = "!=";

type NotEqualsValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function notEquals(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<NotEqualsValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "not-equals",
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

export { notEquals };
