import { IdNodeBase } from "./nodes";

interface CustomOperatorNode<TProps = unknown> extends IdNodeBase<string> {
  operatorProps: TProps;
}

interface CustomOperatorDefinition<TProps = unknown> {
  id: string;
  toString: (node: CustomOperatorNode<TProps>) => string;
}

type Definition = CustomOperatorDefinition;


interface CustomOperatorAPI {
  // eslint-disable-next-line @tseslint/prefer-readonly-parameter-types
  registerOperator: <TProps>(definition: CustomOperatorDefinition<TProps>) => CustomOperatorAPI;

  getOperator: <TProps = unknown>(id: string) => CustomOperatorDefinition<TProps> | undefined;

  getAllOperators: () => Map<string, CustomOperatorDefinition>;

  hasOperator: (id: string) => boolean;

  removeAllOperators: () => void;

  removeOperator: (id: string) => boolean;

  createNode: <TProps>(id: string, props: TProps) => CustomOperatorNode<TProps>;
}

export type { Definition, CustomOperatorAPI, CustomOperatorNode, CustomOperatorDefinition };
