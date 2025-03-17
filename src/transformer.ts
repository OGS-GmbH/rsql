import { EqualsNode, GreaterNode, GreaterOrEqualNode, IdNodeBase, InNode, LessNode, LessOrEqualNode, LikeNode, NotEqualsNode, NotLikeNode, NullNode, IsNullNode, OutNode, QueryNode, RangeNode, AndNode, OrNode, GroupNode } from "./nodes";

class Transformer {
  private _astLike: IdNodeBase<unknown>[] | null = null;

  private _appendNode (node: IdNodeBase<unknown>): void {
    this._astLike === null
      ? this._astLike = [ node ]
      : this._astLike.push(node);
  }

  public static define(astLike: IdNodeBase<unknown>[]): string {
    let queryString: string = "";

    for (const astLikeItem of astLike) {
      switch 
      astLikeItem.id === "AndNode"
    }

    return queryString;
  }

  public static equals(column: string, query: string): EqualsNode {
    return {
      id: "EqualsNode",
      column,
      query
    };
  }

  public static notEquals(column: string, query: string): NotEqualsNode {
    return {
      id: "NotEqualsNode",
      column,
      query
    }
  }

  public query(column: string, query: string): QueryNode {
    return {
      id: "QueryNode",
      column,
      query
    };
  }

  public like(column: string, query: string): LikeNode {
    return {
      id: "LikeNode",
      column,
      query
    };
  }

  public static in(column: string, query: string[]): InNode {
    return {
      id: "InNode",
      column,
      query
    };
  }

  public out(column: string, query: string[]): OutNode {
    return {
      id: "OutNode",
      column,
      query
    };
  }

  public range(column: string, from: string, to: string): RangeNode {
    return {
      id: "RangeNode",
      column,
      queryFrom: from,
      queryTo: to
    }
  }

  public notLike(column: string, query: string): NotLikeNode {
    return {
      id: "NotLikeNode",
      column,
      query
    };
  }

  public less(column: string, query: string): LessNode {
    return {
      id: "LessNode",
      column,
      query
    };
  }

  public lessOrEqual(column: string, query: string): LessOrEqualNode {
    return {
      id: "LessOrEqualNode",
      column,
      query
    };
  }

  public greater(column: string, query: string): GreaterNode {
    return {
      id: "GreaterNode",
      column,
      query
    };
  }

  public greaterOrEqual(column: string, query: string): GreaterOrEqualNode {
    return {
      id: "GreaterOrEqualNode",
      column,
      query
    };
  }

  public null(column: string, query: boolean): NullNode {
    return {
      id: "NullNode",
      column,
      query
    };
  }

  public isNull(column: string, query: boolean): IsNullNode {
    return {
      id: "IsNullNode",
      column,
      query
    };
  }

  public and(...astLike: IdNodeBase<unknown>[]): AndNode {
    return {
      id: "AndNode",
      nodes: astLike
    };
  }

  public or(...astLike: IdNodeBase<unknown>[]): OrNode {
    return {
      id: "OrNode",
      nodes: astLike
    };
  }

  public group(...astLike: IdNodeBase<unknown>[]): GroupNode {
    return {
      id: "GroupNode",
      nodes: astLike
    };
  }

  public toString(): string | null {
    if (this._astLike === null)
      return null;

    for (const astLikeItem of this._astLike) {
      switch (astLikeItem) {
        
      }
    }
  }
}
