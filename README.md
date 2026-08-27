> _We're OGS, check out our work on [github.com/ogs-gmbh](https://github.com/ogs-gmbh)_

# rsql

_An established, production-ready package for building RSQL queries in TypeScript, providing a composable operator API with a typed AST and fully customizable serialization._

![Preview](./docs/preview.png)

<a href="./LICENSE" target="_blank"><img src="https://img.shields.io/github/license/OGS-GmbH/rsql?color=0f434e&logo=hackthebox&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://github.com/OGS-GmbH/rsql/actions/workflows/main-deploy.yml" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/OGS-GmbH/rsql/main-deploy.yml?color=0f434e&logo=rocket&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://www.npmjs.com/package/@ogs-gmbh/rsql" target="_blank"><img src="https://img.shields.io/npm/v/%40ogs-gmbh%2Frsql?color=0f434e&logo=npm&logoColor=000000&labelColor=ffffff" /></a>

- **Composable Operator API**\
  Provides comparison, logical and grouping operators that nest freely, enabling complex filters to be expressed as plain function calls.

- **Typed Abstract Syntax Tree**\
  Every operator returns a fully typed node exposing its kind, values and children, allowing queries to be inspected and transformed instead of parsed from strings.

- **Customizable Serialization**\
  Accepts custom separators on every operator, adapting the output to backends that deviate from the default RSQL notation.

- **Zero Dependencies**\
  Ships as platform-neutral ESM without any runtime dependencies, keeping the footprint of your project minimal.

## Getting Started

> [!IMPORTANT]
> We're offering an extensive API-Reference covered with in-depth usage examples of this project.

To get a starting point, simply refer to our documentation at [ogs-gmbh.github.io/rsql](https://ogs-gmbh.github.io/rsql).

### Prerequisites

- Node.js version 18 or higher
- A package manager: e.g. npm, pnpm, ...

### Installation

Using npm:

```sh
$ npm install @ogs-gmbh/rsql
```

<details>
  <summary>Using a different package managers?</summary>
  <br/>
  
  Using yarn:
  ```sh
  $ yarn add @ogs-gmbh/rsql
  ```
  
  Using pnpm:
  ```sh
  $ pnpm add @ogs-gmbh/rsql
  ```
  
  Using bun:
  ```sh
  $ bun add @ogs-gmbh/rsql
  ```

</details>

### Usage

Here we provide a simple example.

```ts [example.ts]
import { and, define, equals, group, like, or, range } from "@ogs-gmbh/rsql";

const definition = define(
  and([
    group(or([equals("status", "active"), equals("status", "pending")])),
    range("age", 18, 65),
    like("name", "*son")
  ])
);

// "(status==active,status==pending);age=rng=18,65;name=like=*son"
const query = definition.toString();

// "and"
const kind = definition.ast.kind;
```

## License

The MIT License (MIT) - Please have a look at the [LICENSE file](./LICENSE) for more details.

## Contributing

Contributions are always welcome and greatly appreciated. Whether you want to report a bug, suggest a new feature, or improve the documentation, your input helps make the project better for everyone.

Feel free to submit a pull request, issue or feature request.

### Issues and Feature Requests

Reporting an issue or creating a feature request is made by creating a new issue on this repository.

You can create a [new issue or feature request here](../../issues/new/choose).

### Pull Requests

GitHub offers a solid guideline for contributing to open source projects through pull requests, covering key practices. These best practices provide a reliable starting point for making effective contributions.

You can find the [guidelines here](https://docs.github.com/get-started/exploring-projects-on-github/contributing-to-a-project).

### Code Of Conduct

We are committed to keeping a welcoming, inclusive, and respectful community for everyone. To help us achieve this, we kindly ask that you adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Disclaimer

All trademarks and registered trademarks mentioned are property of their respective owners and are used for identification purposes only. Use of these names does not imply endorsement or affiliation.

This project is a trademark of OGS Gesellschaft für Datenverarbeitung und Systemberatung mbH. The License does not grant rights to use the trademark without permission.

---

<a href="https://www.ogs.de/en/">
  <picture>
    <source
      srcset="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/light.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img height="64" alt="OGS Logo" src="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/dark.svg"
  </picture>
</a>

Gesellschaft für Datenverarbeitung und Systemberatung mbH

[Imprint](https://www.ogs.de/en/imprint/) | [Contact](https://www.ogs.de/en/contact/) | [Careers](https://www.ogs.de/en/about-ogs/#Careers)
