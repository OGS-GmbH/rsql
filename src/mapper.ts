import { AndNode, EqualsNode, GreaterNode, GreaterOrEqualNode, GroupNode, IdNodeBase, InNode, IsNullNode, LessNode, LessOrEqualNode, LikeNode, NotEqualsNode, NotLikeNode, NullNode, OrNode, OutNode, QueryNode, RangeNode } from "./nodes";
import { customOperatorRegistry, type CustomOperatorDefinition, type CustomOperatorNode } from "./custom-operators";
import { AND, OR, SEPARATOR } from "./operators";

function mapNode (astLike: IdNodeBase<unknown>): string {
  let queryString: string = "";

  switch (astLike.id) {
    case "AndNode": {
      queryString += (astLike as AndNode).nodes.map((astLikeNode: IdNodeBase<unknown>) => mapNode(astLikeNode)).join(AND);

      break;
    }

    case "OrNode": {
      queryString += (astLike as OrNode).nodes.map((astLikeNode: IdNodeBase<unknown>) => mapNode(astLikeNode)).join(OR);

      break;
    }

    case "GroupNode": {
      queryString += `(${ mapNode((astLike as GroupNode).node) })`;

      break;
    }

    case "EqualsNode": {
      queryString += `${ (astLike as EqualsNode).column }${ SEPARATOR.EQUALS }${ (astLike as EqualsNode).query }`;

      break;
    }

    case "NotEqualsNode": {
      queryString += `${ (astLike as NotEqualsNode).column }${ SEPARATOR.NOT_EQUALS }${ (astLike as NotEqualsNode).query }`;

      break;
    }

    case "QueryNode": {
      queryString += `${ (astLike as QueryNode).column }${ SEPARATOR.QUERY }'${ (astLike as QueryNode).query }`;

      break;
    }

    case "LikeNode": {
      queryString += `${ (astLike as LikeNode).column }${ SEPARATOR.LIKE }${ (astLike as LikeNode).query }`;

      break;
    }

    case "NotLikeNode": {
      queryString += `${ (astLike as NotLikeNode).column }${ SEPARATOR.NOT_LIKE }${ (astLike as NotLikeNode).query }`;

      break;
    }

    case "InNode": {
      queryString += `${ (astLike as InNode).column }${ SEPARATOR.IN }(${ (astLike as InNode).query.join(", ") })`;

      break;
    }

    case "OutNode": {
      queryString += `${ (astLike as OutNode).column }${ SEPARATOR.OUT }(${ (astLike as OutNode).query.join(", ") })`;

      break;
    }

    case "RangeNode": {
      queryString += `${ (astLike as RangeNode).column }${ SEPARATOR.RANGE }(${ (astLike as RangeNode).queryFrom },${ (astLike as RangeNode).queryTo })`;

      break;
    }

    case "LessNode": {
      queryString += `${ (astLike as LessNode).column }${ SEPARATOR.LESS }${ (astLike as LessNode).query }`;

      break;
    }

    case "LessOrEqualNode": {
      queryString += `${ (astLike as LessOrEqualNode).column }${ SEPARATOR.LESS_OR_EQUAL }${ (astLike as LessOrEqualNode).query }`;

      break;
    }

    case "GreaterNode": {
      queryString += `${ (astLike as GreaterNode).column }${ SEPARATOR.GREATER }${ (astLike as GreaterNode).query }`;

      break;
    }

    case "GreaterOrEqualNode": {
      queryString += `${ (astLike as GreaterOrEqualNode).column }${ SEPARATOR.GREATER_OR_EQUAL }${ (astLike as GreaterOrEqualNode).query }`;

      break;
    }

    case "NullNode": {
      queryString += `${ (astLike as NullNode).column }${ SEPARATOR.NULL }${ (astLike as NullNode).query }`;

      break;
    }

    case "IsNullNode": {
      queryString += `${ (astLike as IsNullNode).column }${ SEPARATOR.IS_NULL }${ (astLike as IsNullNode).query }`;

      break;
    }

    default: {
      const customOperatorDefinition = customOperatorRegistry.get(astLike.id as string);

      if (customOperatorDefinition === undefined)
        throw new Error(`Operator with id '${ astLike.id as string }' is not known. If it is a custom operator, make sure to register it first.`);

      queryString += customOperatorDefinition.toString(astLike as CustomOperatorNode<unknown>);

      break;
    }
  }

  return queryString;
}

export {
  mapNode
};
