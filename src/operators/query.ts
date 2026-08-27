import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=q=";

type QueryValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function query(
  column: Stringable,
  _query: Stringable,
  separator: Stringable = defaultSeparator
): Node<QueryValue> {
  const columnStr = String(column);
  const queryStr = String(_query);
  const separatorStr = String(separator);

  return {
    kind: "query",
    value: {
      column: columnStr,
      rawColumn: column,
      query: queryStr,
      rawQuery: _query,
      separator: separatorStr,
      rawSeparator: separator
    },
    toString() {
      return columnStr + separatorStr + queryStr;
    }
  };
}

export { query };
