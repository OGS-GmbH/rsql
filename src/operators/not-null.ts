import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=null=";

type NullValue = {
  column: string;
  rawColumn: Stringable;
  query: string;
  rawQuery: Stringable;
  separator: string;
  rawSeparator: Stringable;
};

function nulll(
  column: Stringable,
  query: Stringable,
  separator: Stringable = defaultSeparator
): Node<NullValue> {
  const columnStr = String(column);
  const queryStr = String(query);
  const separatorStr = String(separator);

  return {
    kind: "null",
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

export { nulll };
