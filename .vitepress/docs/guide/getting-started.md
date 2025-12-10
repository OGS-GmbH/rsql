# Getting started

## What's inside?

This rsql-library provides a modular and customizable way to build your rsql-queries. The library has zero dependencies which makes it a lightweight addition to your project.


## Installation


### Prerequisites

- Node.js version 18 or higher
- A package manager: e.g. npm, pnpm, ...
- A Node.js-based project


Install `@ogs-gmbh/rsql` using your preferred package manager:

::: code-group

```bash [npm]
$ npm install @ogs-gmbh/rsql
```

```bash [pnpm]
$ pnpm install @ogs-gmbh/rsql
```

```bash [yarn]
$ yarn add @ogs-gmbh/rsql
```

```bash [bun]
$ bun add @ogs-gmbh/rsql
```

:::


## Usage

To use the rsql package, import the service:
```typescript
import { rsqlBuilder } from "@ogs-gmbh/rsql";

const {define, and, equals } = rsqlBuilder

const test = define(and(equals("name", "John")))

//  test.toString() => "name==John"

```

The package also allows you to create your own custom operator.

```typescript
import { rsqlBuilder ,  rsqlCustom} from "@ogs-gmbh/rsql";

type CustomOperatorNode<T>  = rsqlCustom.CustomOperatorNode<T>
type  DefinitionResult = rsqlBuilder.DefinitionResult;

interface Query {
  column: string;
  query: string;
}

interface RangeProps {
  column: string;
  from: string;
  to: string;
}

const {createCustomOperator} = rsqlCustom
const {define, and } = rsqlBuilder


const contain: (data: Query) => CustomOperatorNode<Query> = createCustomOperator<Query>({
  id: "ContainsOperatorNode",
  toString: (data: Query) => `${ data.column }=contains="${ data.query }"`
});


const searchQuery: DefinitionResult = define(and(contain({ column: "description", query: "laptop" })));

//  searchQuery.toString() => "description=contains="laptop""

```