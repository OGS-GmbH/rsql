import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=notlike=";

type NotLikeValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function notLike(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<NotLikeValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "not-like",
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

export { notLike };
