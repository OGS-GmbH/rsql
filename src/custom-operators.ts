
import { CustomOperatorNode, CustomOperatorDefinition, Definition, CustomOperatorAPI } from "./types/custom-operators";


const operators: Map<string, Definition> = new Map<string, Definition>();
const customOperatorApi: CustomOperatorAPI = {
  // eslint-disable-next-line @tseslint/prefer-readonly-parameter-types
  registerOperator<TProps>(definition: CustomOperatorDefinition<TProps>): CustomOperatorAPI {
    if (operators.has(definition.id)) throw new Error(`Custom operator with id '${ definition.id }' already exists`);

    operators.set(definition.id, definition as Definition);

    return customOperatorApi;
  },

  getOperator<TProps = unknown>(id: string): CustomOperatorDefinition<TProps> | undefined {
    const definition: Definition | undefined = operators.get(id);

    return definition as CustomOperatorDefinition<TProps> | undefined;
  },

  getAllOperators (): Map<string, Definition> {
    return new Map(operators);
  },

  hasOperator (id: string): boolean {
    return operators.has(id);
  },

  removeAllOperators (): void {
    operators.clear();
  },

  removeOperator (id: string): boolean {
    return operators[ "delete" ](id);
  },

  createNode<TProps>(id: string, props: TProps): CustomOperatorNode<TProps> {
    return { id, operatorProps: props };
  }
};


export { customOperatorApi };

