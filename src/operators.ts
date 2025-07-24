type OperatorConfig = Partial<OperatorValues>;

interface OperatorValues {
  AND: string;
  OR: string;
  EQUALS: string;
  NOT_EQUALS: string;
  QUERY: string;
  LIKE: string;
  NOT_LIKE: string;
  IN: string;
  OUT: string;
  RANGE: string;
  LESS: string;
  LESS_OR_EQUAL: string;
  GREATER: string;
  GREATER_OR_EQUAL: string;
  NULL: string;
  IS_NULL: string;
}

const DEFAULT_OPERATOR_CONFIG: OperatorValues = {
  AND: ";",
  OR: ",",
  EQUALS: "==",
  NOT_EQUALS: "!=",
  QUERY: "=q=",
  LIKE: "=lk=",
  NOT_LIKE: "=notlike=",
  IN: "=in=",
  OUT: "=out=",
  RANGE: "=rng=",
  LESS: "=lt=",
  LESS_OR_EQUAL: "=le=",
  GREATER: "=gt=",
  GREATER_OR_EQUAL: "=ge=",
  NULL: "=null=",
  IS_NULL: "=isnull="
};

let operatorConfig: OperatorValues = { ...DEFAULT_OPERATOR_CONFIG };

function getOperators (): Readonly<OperatorValues> {
  return operatorConfig;
}

function provideOperatorConfig (overrides: OperatorConfig): void {
  operatorConfig = {
    ...DEFAULT_OPERATOR_CONFIG,
    ...overrides
  };
}

export {
  provideOperatorConfig,
  getOperators,
  OperatorValues,
  OperatorConfig
};
