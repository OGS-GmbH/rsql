import type { Node, Stringable } from "../types.js";

const defaultSeparator = ",";

type OrValue = {
  separator: string;
  rawSeparator: Stringable;
};

function or(nodes: Node<unknown>[], separator: Stringable = defaultSeparator): Node<OrValue> {
  const separatorStr = String(separator);

  return {
    kind: "or",
    children: nodes,
    value: {
      separator: separatorStr,
      rawSeparator: separator
    },
    toString() {
      return nodes.map((node) => node.toString()).join(separatorStr);
    }
  };
}

export { or };
