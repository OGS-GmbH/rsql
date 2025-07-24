type SeparatorConfig = Partial<SeparatorValues>;

interface SeparatorValues {
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

const DEFAULT_SEPARATOR_CONFIG: SeparatorValues = {
  AND: ";",
  OR: ",",
  EQUALS: "==",
  NOT_EQUALS: "!=",
  QUERY: "=q=",
  LIKE: "=like=",
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

let separatorConfig: SeparatorValues = { ...DEFAULT_SEPARATOR_CONFIG };

function getSeparator (): Readonly<SeparatorValues> {
  return separatorConfig;
}

function provideSeparatorConfig (overrides: SeparatorConfig): void {
  separatorConfig = {
    ...DEFAULT_SEPARATOR_CONFIG,
    ...overrides
  };
}

export {
  provideSeparatorConfig,
  getSeparator,
  SeparatorValues,
  SeparatorConfig
};
