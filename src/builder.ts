import { mapNode } from "./mapper";
import { EqualsNode, GreaterNode, GreaterOrEqualNode, IdNodeBase, InNode, LessNode, LessOrEqualNode, LikeNode, NotEqualsNode, NotLikeNode, NullNode, IsNullNode, OutNode, QueryNode, RangeNode, AndNode, OrNode, GroupNode, NodeContainerBase } from "./nodes";

interface DefinitionResult {
  ast: IdNodeBase<unknown>;
  toString: () => string;
}

type Node = IdNodeBase<unknown>;
type NodeContainer = NodeContainerBase & IdNodeBase<unknown>;

function define(definition: Node): DefinitionResult {
  return {
    ast: definition,
    toString: (): string => mapNode(definition)
  };
}

function equals(column: string, query: string): EqualsNode {
  return {
    id: "EqualsNode",
    column,
    query
  };
}

function notEquals(column: string, query: string): NotEqualsNode {
  return {
    id: "NotEqualsNode",
    column,
    query
  }
}

function query(column: string, query: string): QueryNode {
  return {
    id: "QueryNode",
    column,
    query
  };
}

function like(column: string, query: string): LikeNode {
  return {
    id: "LikeNode",
    column,
    query
  };
}

function iin(column: string, query: string[]): InNode {
  return {
    id: "InNode",
    column,
    query
  };
}

function out(column: string, query: string[]): OutNode {
  return {
    id: "OutNode",
    column,
    query
  };
}

function range(column: string, from: string, to: string): RangeNode {
  return {
    id: "RangeNode",
    column,
    queryFrom: from,
    queryTo: to
  }
}

function notLike(column: string, query: string): NotLikeNode {
  return {
    id: "NotLikeNode",
    column,
    query
  };
}

function less(column: string, query: string): LessNode {
  return {
    id: "LessNode",
    column,
    query
  };
}

function lessOrEqual(column: string, query: string): LessOrEqualNode {
  return {
    id: "LessOrEqualNode",
    column,
    query
  };
}

function greater(column: string, query: string): GreaterNode {
  return {
    id: "GreaterNode",
    column,
    query
  };
}

function greaterOrEqual(column: string, query: string): GreaterOrEqualNode {
  return {
    id: "GreaterOrEqualNode",
    column,
    query
  };
}

function nnull(column: string, query: boolean): NullNode {
  return {
    id: "NullNode",
    column,
    query
  };
}

function isNull(column: string, query: boolean): IsNullNode {
  return {
    id: "IsNullNode",
    column,
    query
  };
}

function and(...astLike: Node[]): AndNode {
  return {
    id: "AndNode",
    nodes: astLike
  };
}

function or(...astLike: Node[]): OrNode {
  return {
    id: "OrNode",
    nodes: astLike
  };
}

function group(astLike: NodeContainer): GroupNode {
  return {
    id: "GroupNode",
    node: astLike
  };
}

export {
  define,
  equals,
  notEquals,
  query,
  like,
  iin,
  out,
  range,
  notLike,
  less,
  lessOrEqual,
  greater,
  greaterOrEqual,
  nnull,
  isNull,
  and,
  or,
  group
}
