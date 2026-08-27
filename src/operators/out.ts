import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=out=";
const queryDefaultSeparator = ",";

type OutValue = {
  column: string;
  rawColumn: Stringable;
  query: string[];
  rawQuery: Stringable[];
  separator: string;
  rawSeparator: Stringable;
  querySeparator: string;
  rawQuerySeparator: Stringable;
};

function out(
  column: Stringable,
  query: Stringable[],
  separator: Stringable = defaultSeparator,
  querySeparator: Stringable = queryDefaultSeparator
): Node<OutValue> {
  const columnStr = String(column);
  const queryStr = query.map((queryItem) => String(queryItem));
  const separatorStr = String(separator);
  const querySeparatorStr = String(querySeparator);

  return {
    kind: "out",
    value: {
      column: columnStr,
      rawColumn: column,
      query: queryStr,
      rawQuery: query,
      separator: separatorStr,
      rawSeparator: separator,
      querySeparator: querySeparatorStr,
      rawQuerySeparator: querySeparator
    },
    toString() {
      return columnStr + separatorStr + queryStr.join(querySeparatorStr);
    }
  };
}

export { out };
