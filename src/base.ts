import type { Node } from "./types.js";

function define(node: Node) {
  return {
    ast: node,
    toString() {
      return node.toString();
    }
  };
}

export { define };
