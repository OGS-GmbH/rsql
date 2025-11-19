import { IdNodeBase } from "./nodes";

interface CustomOperatorNode<Data> extends IdNodeBase<string> {
  data: Data;
}

interface CustomOperatorDefinition<Data> {
  id: string;
  toString(data: Data): string;
}

interface CustomOperatorRegistry {
  add<Data>(definition: CustomOperatorDefinition<Data>): this;
  get<Data = unknown>(id: string): CustomOperatorDefinition<Data> | undefined;
  getAll(): Map<string, CustomOperatorDefinition<unknown>>;
  has(id: string): boolean;
  removeAll(): void;
  remove(id: string): boolean;
}


const _registryMap: Map<string, CustomOperatorDefinition<unknown>> = new Map<string, CustomOperatorDefinition<unknown>>();
const customOperatorRegistry: CustomOperatorRegistry = {
  add<Data>(definition: CustomOperatorDefinition<Data>): CustomOperatorRegistry {
    if (customOperatorRegistry.has(definition.id))
      throw new Error(`Custom operator with id '${ definition.id }' already exists`);

    _registryMap.set(definition.id, definition as CustomOperatorDefinition<unknown>);

    return customOperatorRegistry;
  },

  get<Data>(id: string): CustomOperatorDefinition<Data> | undefined {
    const definition: CustomOperatorDefinition<Data> | undefined = _registryMap.get(id);

    return definition;
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

function createCustomOperator<Data> (definition: CustomOperatorDefinition<Data>) {
  customOperatorRegistry.add(definition);

  return (data: Data): CustomOperatorNode<Data> => ({
    id: definition.id,
    data
  });
}

export type {
  CustomOperatorNode,
  CustomOperatorDefinition
};
export {
  createCustomOperator,
  customOperatorRegistry
};

