interface ColumnNodeBase {
  column: string;
}

interface SingleQueryNodeBase {
  query: string;
}

interface TupleLikeQueryNodeBase {
  query: string[];
}

interface BooleanLikeQueryNodeBase {
  query: boolean;
}

interface NodeContainerBase {
  nodes: Array<IdNodeBase<unknown>>;
}

interface IdNodeBase<T> {
  id: T;
}

interface AndNode extends IdNodeBase<"AndNode">, NodeContainerBase {}

interface OrNode extends IdNodeBase<"OrNode">, NodeContainerBase {}

interface GroupNode extends IdNodeBase<"GroupNode"> {
  node: IdNodeBase<unknown>;
}

interface EqualsNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"EqualsNode"> {}

interface NotEqualsNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"NotEqualsNode"> {}

interface QueryNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"QueryNode"> {}

interface LikeNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"LikeNode"> {}

interface NotLikeNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"NotLikeNode"> {}

interface InNode extends ColumnNodeBase, TupleLikeQueryNodeBase, IdNodeBase<"InNode"> {}

interface OutNode extends ColumnNodeBase, TupleLikeQueryNodeBase, IdNodeBase<"OutNode"> {}

interface RangeNode extends ColumnNodeBase, IdNodeBase<"RangeNode"> {
  queryFrom: string;
  queryTo: string;
}

interface LessNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"LessNode"> {}

interface LessOrEqualNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"LessOrEqualNode"> {}

interface GreaterNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"GreaterNode"> {}

interface GreaterOrEqualNode extends ColumnNodeBase, SingleQueryNodeBase, IdNodeBase<"GreaterOrEqualNode"> {}

interface NullNode extends ColumnNodeBase, IdNodeBase<"NullNode">, BooleanLikeQueryNodeBase {}

interface IsNullNode extends ColumnNodeBase, IdNodeBase<"IsNullNode">, BooleanLikeQueryNodeBase {}

type Node = IdNodeBase<unknown>;

type NodeContainer = NodeContainerBase & IdNodeBase<unknown>;


export {
  NodeContainerBase,
  IdNodeBase,
  AndNode,
  OrNode,
  GroupNode,
  EqualsNode,
  NotEqualsNode,
  QueryNode,
  LikeNode,
  InNode,
  OutNode,
  RangeNode,
  NotLikeNode,
  LessNode,
  LessOrEqualNode,
  GreaterNode,
  GreaterOrEqualNode,
  NullNode,
  IsNullNode,
  Node,
  NodeContainer
};
