import type { Node, Stringable } from "../types.js";

const defaultSeparator = "=rng=";
const defaultRangeSeparator = ",";

type RangeValue = {
  column: string;
  rawColumn: Stringable;
  from: string;
  rawFrom: Stringable;
  to: string;
  rawTo: Stringable;
  separator: string;
  rawSeparator: Stringable;
  rangeSeparator: string;
  rawRangeSeparator: Stringable;
};

function range(
  column: Stringable,
  from: Stringable,
  to: Stringable,
  separator: Stringable = defaultSeparator,
  rangeSeparator: Stringable = defaultRangeSeparator
): Node<RangeValue> {
  const columnStr = String(column);
  const fromStr = String(from);
  const toStr = String(to);
  const separatorStr = String(separator);
  const rangeSeparatorStr = String(rangeSeparator);

  return {
    kind: "range",
    value: {
      column: columnStr,
      rawColumn: column,
      from: fromStr,
      rawFrom: from,
      to: toStr,
      rawTo: to,
      separator: separatorStr,
      rawSeparator: separator,
      rangeSeparator: rangeSeparatorStr,
      rawRangeSeparator: rangeSeparator
    },
    toString() {
      return columnStr + separatorStr + fromStr + rangeSeparatorStr + toStr;
    }
  };
}

export { range };
