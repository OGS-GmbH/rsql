import type { Node, Stringable } from "../types.js";

const defaultSeparator = ";";

type AndValue = {
  separator: string;
  rawSeparator: Stringable;
};

function and(nodes: Node<unknown>[], separator: Stringable = defaultSeparator): Node<AndValue> {
  const separatorStr = String(separator);

  return {
    kind: "and",
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

export { and };
