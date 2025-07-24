import { getSeparator } from "../operators";
import { AndNode, EqualsNode, GreaterNode, GreaterOrEqualNode, GroupNode, IdNodeBase, InNode, IsNullNode, LessNode, LessOrEqualNode, LikeNode, NotEqualsNode, NotLikeNode, NullNode, OrNode, OutNode, QueryNode, RangeNode } from "../types/nodes";


function mapNode (astLike: IdNodeBase<unknown>): string {
  let queryString: string = "";

  switch (astLike.id) {
    case "AndNode": {
      queryString += (astLike as AndNode).nodes.map((astLikeNode: IdNodeBase<unknown>) => mapNode(astLikeNode)).join(getSeparator().AND);

      break;
    }

    case "OrNode": {
      queryString += (astLike as OrNode).nodes.map((astLikeNode: IdNodeBase<unknown>) => mapNode(astLikeNode)).join(getSeparator().OR);

      break;
    }

    case "GroupNode": {
      queryString += `(${ mapNode((astLike as GroupNode).node) })`;

      break;
    }

    case "EqualsNode": {
      queryString += `${ (astLike as EqualsNode).column }${ getSeparator().EQUALS }${ (astLike as EqualsNode).query }`;

      break;
    }

    case "NotEqualsNode": {
      queryString += `${ (astLike as NotEqualsNode).column }${ getSeparator().NOT_EQUALS }${ (astLike as NotEqualsNode).query }`;

      break;
    }

    case "QueryNode": {
      queryString += `${ (astLike as QueryNode).column }${ getSeparator().QUERY }'${ (astLike as QueryNode).query }'}`;

      break;
    }

    case "LikeNode": {
      queryString += `${ (astLike as LikeNode).column }${ getSeparator().LIKE }${ (astLike as LikeNode).query }`;

      break;
    }

    case "NotLikeNode": {
      queryString += `${ (astLike as NotLikeNode).column }${ getSeparator().NOT_LIKE }${ (astLike as NotLikeNode).query }`;

      break;
    }

    case "InNode": {
      queryString += `${ (astLike as InNode).column }${ getSeparator().IN }(${ (astLike as InNode).query.join(", ") })`;

      break;
    }

    case "OutNode": {
      queryString += `${ (astLike as OutNode).column }${ getSeparator().OUT }(${ (astLike as OutNode).query.join(", ") })`;

      break;
    }

    case "RangeNode": {
      queryString += `${ (astLike as RangeNode).column }${ getSeparator().RANGE }(${ (astLike as RangeNode).queryFrom },${ (astLike as RangeNode).queryTo })`;

      break;
    }

    case "LessNode": {
      queryString += `${ (astLike as LessNode).column }${ getSeparator().LESS }${ (astLike as LessNode).query }`;

      break;
    }

    case "LessOrEqualNode": {
      queryString += `${ (astLike as LessOrEqualNode).column }${ getSeparator().LESS_OR_EQUAL }${ (astLike as LessOrEqualNode).query }`;

      break;
    }

    case "GreaterNode": {
      queryString += `${ (astLike as GreaterNode).column }${ getSeparator().GREATER }${ (astLike as GreaterNode).query }`;

      break;
    }

    case "GreaterOrEqualNode": {
      queryString += `${ (astLike as GreaterOrEqualNode).column }${ getSeparator().GREATER_OR_EQUAL }${ (astLike as GreaterOrEqualNode).query }`;

      break;
    }

    case "NullNode": {
      queryString += `${ (astLike as NullNode).column }${ getSeparator().NULL }${ (astLike as NullNode).query }`;

      break;
    }

    case "IsNullNode": {
      queryString += `${ (astLike as IsNullNode).column }${ getSeparator().IS_NULL }${ (astLike as IsNullNode).query }`;

      break;
    }
  }

  return queryString;
}

export {
  mapNode
};
