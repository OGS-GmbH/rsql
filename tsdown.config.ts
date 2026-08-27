import { assetsPlugin } from "@ogs-gmbh/rolldown-plugin-assets";
import { packageJsonPlugin } from "@ogs-gmbh/rolldown-plugin-package-json";
import { defineConfig } from "tsdown";
import packageJson from "./package.json" with { type: "json" };

const repositoryName = packageJson.name.split("/").pop();

const copyrightBanner = `
/*!
 * Copyright (c) 2026 — present OGS Gesellschaft für Datenverarbeitung und Systemberatung mbH
 * Licensed under ${packageJson.license} (See https://github.com/OGS-GmbH/${repositoryName}/LICENSE)
 */
`;

export default defineConfig({
  platform: "neutral",
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  dts: {
    enabled: true,
    sourcemap: true
  },
  outDir: "dist/main",
  unbundle: false,
  sourcemap: true,
  deps: { skipNodeModulesBundle: true, neverBundle: [/.*/] },
  banner: copyrightBanner,
  plugins: [
    assetsPlugin(["README.md", "LICENSE", "CHANGELOG.md"]),
    packageJsonPlugin({
      clean: true,
      override: {
        homepage: `https://ogs-gmbh.github.io/${repositoryName}`,
        bugs: `https://github.com/OGS-GmbH/${repositoryName}/issues`,
        repository: `https://github.com/OGS-GmbH/${repositoryName}`,
        exports: {
          types: "./public-api.d.ts",
          default: "./public-api.js"
        }
      }
    })
  ]
});
