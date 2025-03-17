import { AndNode, EqualsNode, GreaterNode, GreaterOrEqualNode, GroupNode, IdNodeBase, InNode, IsNullNode, LessNode, LessOrEqualNode, LikeNode, NodeContainerBase, NotEqualsNode, NotLikeNode, NullNode, OrNode, OutNode, QueryNode, RangeNode } from "./nodes";
import { SEPARATOR } from "./operators";

function mapEqualsNode(node: EqualsNode): string {
  return `${node.column}${SEPARATOR.EQUALS}${node.query}`;
}

function mapNotEqualsNode(node: NotEqualsNode): string {
  return `${node.column}${SEPARATOR.NOT_EQUALS}${node.query}`;
}

function mapQueryNode(node: QueryNode): string {
  return `${node.column}${SEPARATOR.QUERY}'${node.query}'}`;
}

function mapLikeNode(node: LikeNode): string {
  return `${node.column}${SEPARATOR.LIKE}${node.query}`;
}

function mapNotLikeNode(node: NotLikeNode): string {
  return `${node.column}${SEPARATOR.NOT_LIKE}${node.query}`;
}

function mapInNode(node: InNode): string {
  return `${node.column}${SEPARATOR.IN}(${node.query.join(", ")})`;
}

function mapOutNode(node: OutNode): string {
  return `${node.column}${SEPARATOR.OUT}(${node.query.join(", ")})`;
}

function mapRangeNode(node: RangeNode): string {
  return `${node.column}${SEPARATOR.RANGE}(${node.queryFrom},${node.queryTo})`;
}

function mapLessNode(node: LessNode): string {
  return `${node.column}${SEPARATOR.LESS}${node.query}`;
}

function mapLessOrEqualNode(node: LessOrEqualNode): string {
  return `${node.column}${SEPARATOR.LESS_OR_EQUAL}${node.query}`;
}

function mapGreaterNode(node: GreaterNode): string {
  return `${node.column}${SEPARATOR.GREATER}${node.query}`;
}

function mapGreaterOrEqualNode(node: GreaterOrEqualNode): string {
  return `${node.column}${SEPARATOR.GREATER_OR_EQUAL}${node.query}`;
}

function mapNullNode(node: NullNode): string {
  return `${node.column}${SEPARATOR.NULL}${node.query}`;
}

function mapIsNullNode(node: IsNullNode): string {
  return `${node.column}${SEPARATOR.IS_NULL}${node.query}`;
}

function mapNodeContainer(astLike: IdNodeBase<unknown>): string {
  let queryString: string = "";

  switch(astLike.id) {
    case "AndNode": {
      queryString += mapAll((astLike as AndNode).nodes)
      break;
    }
  }

  return queryString;
}

function mapAll(astLike: IdNodeBase<unknown>[]): string {
  let queryString: string = "";

  for (const astLikeItem of astLike) {
    switch (astLikeItem.id) {
      case "AndNode": {
        queryString += mapAll((astLikeItem as AndNode).nodes)
        break;
      }

      case "OrNode": {
        queryString += mapAll((astLikeItem as OrNode).nodes);
        break;
      }

      case "GroupNode": {
        queryString += mapAll((astLikeItem as GroupNode).nodes)
        break;
      }

      case "EqualsNode": {
        queryString += mapEqualsNode(astLikeItem as EqualsNode);
        break;
      }

      case "NotEqualsNode": {
        queryString += mapNotEqualsNode(astLikeItem as NotEqualsNode);
        break;
      }

      case "QueryNode": {
        queryString += mapQueryNode(astLikeItem as QueryNode);
        break;
      }

      case "LikeNode": {
        queryString += mapLikeNode(astLikeItem as LikeNode);
        break;
      }

      case "NotLikeNode": {
        queryString += mapNotLikeNode(astLikeItem as NotLikeNode);
        break;
      }

      case "InNode": {
        queryString += mapInNode(astLikeItem as InNode);
        break;
      }

      case "OutNode": {
        queryString += mapOutNode(astLikeItem as OutNode);
        break;
      }

      case "RangeNode": {
        queryString += mapRangeNode(astLikeItem as RangeNode);
        break;
      }

      case "LessNode": {
        queryString += mapLessNode(astLikeItem as LessNode);
        break;
      }

      case "LessOrEqualNode": {
        queryString += mapLessOrEqualNode(astLikeItem as LessOrEqualNode);
        break;
      }

      case "GreaterNode": {
        queryString += mapGreaterNode(astLikeItem as GreaterNode);
        break;
      }

      case "GreaterOrEqualNode": {
        queryString += mapGreaterOrEqualNode(astLikeItem as GreaterOrEqualNode);
        break;
      }

      case "NullNode": {
        queryString += mapNullNode(astLikeItem as NullNode);
        break;
      }

      case "IsNullNode": {
        queryString += mapIsNullNode(astLikeItem as IsNullNode);
        break;
      }
    }
  }

  return "";
}

export {
  mapEqualsNode,
  mapNotEqualsNode,
  mapQueryNode,
  mapLikeNode,
  mapNotLikeNode,
  mapInNode,
  mapOutNode,
  mapRangeNode,
  mapLessNode,
  mapLessOrEqualNode,
  mapGreaterNode,
  mapGreaterOrEqualNode,
  mapNullNode,
  mapIsNullNode
}
