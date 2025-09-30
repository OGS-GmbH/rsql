import { IdNodeBase } from "./nodes";

interface CustomOperatorNode<Data> extends IdNodeBase<string> {
  data: Data;
}

interface CustomOperatorDefinition<Data> {
  id: string;
  toString: (data: Data) => string;
}

function createCustomOperator<Data> (definition: CustomOperatorDefinition<Data>) {
  customOperatorRegistry.add(definition);

  return (data: Data): CustomOperatorNode<unknown> => {
    return {
      id: definition.id,
      data: data
    }
  }
}

const _registryMap: Map<string, CustomOperatorDefinition<unknown>> = new Map<string, CustomOperatorDefinition<unknown>>();
const customOperatorRegistry = {
  add<Data>(definition: CustomOperatorDefinition<Data>) {
    if (customOperatorRegistry.has(definition.id))
      throw new Error(`Custom operator with id '${ definition.id }' already exists`);

    _registryMap.set(definition.id, definition as CustomOperatorDefinition<unknown>);

    return customOperatorRegistry;
  },

  get<Data>(id: string): CustomOperatorDefinition<Data> | undefined {
    const definition: CustomOperatorDefinition<Data> | undefined = _registryMap.get(id);

    return definition as CustomOperatorDefinition<Data> | undefined;
  },

  getAll (): Map<string, CustomOperatorDefinition<unknown>> {
    return _registryMap;
  },

  has (id: string): boolean {
    return _registryMap.has(id);
  },

  removeAll (): void {
    _registryMap.clear();
  },

  remove (id: string): boolean {
    return _registryMap[ "delete" ](id);
  }
};

export type {
  createCustomOperator,
  CustomOperatorNode,
  CustomOperatorDefinition
};
export {
  customOperatorRegistry
};

