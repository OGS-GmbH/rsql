import type { Node, Stringable } from "../types.js";

const defaultOpen = "(";
const defaultClose = ")";

type GroupValue = {
  open: string;
  rawOpen: Stringable;
  close: string;
  rawClose: Stringable;
};

function group(
  node: Node<unknown>,
  open: Stringable = defaultOpen,
  close: Stringable = defaultClose
): Node<GroupValue> {
  const openStr = String(open);
  const closeStr = String(close);

  return {
    kind: "group",
    children: [node],
    value: {
      open: openStr,
      rawOpen: open,
      close: closeStr,
      rawClose: close
    },
    toString() {
      return openStr + node.toString() + closeStr;
    }
  };
}

export { group };
