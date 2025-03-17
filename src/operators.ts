const AND: string = ";";
const OR: string = ",";

enum SEPARATOR {
  EQUALS = "==",
  NOT_EQUALS = "!=",
  QUERY = "=q=",
  LIKE = "=like=",
  NOT_LIKE = "=notlike=",
  IN = "=in=",
  OUT = "=out=",
  RANGE = "=rng=",
  LESS = "=lt=",
  LESS_OR_EQUAL = "=le=",
  GREATER = "=gt=",
  GREATER_OR_EQUAL = "=ge=",
  NULL = "=null=",
  IS_NULL = "=isnull="
}

export {
  AND,
  OR,
  SEPARATOR
};
