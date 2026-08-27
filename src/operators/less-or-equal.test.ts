import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { lessOrEqual } from "./less-or-equal.js";

test("lessOrEqual serializes with the default separator", () => {
  const node = lessOrEqual("field", "value");

  expect(node.toString()).toBe("field=le=value");
});

test("lessOrEqual serializes with a custom separator", () => {
  const node = lessOrEqual("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("lessOrEqual exposes the node kind and both stringified and raw values", () => {
  const node = lessOrEqual("field", 10);

  expect(node.kind).toBe("less-or-equal");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=le=",
    rawSeparator: "=le="
  });
});

test("lessOrEqual stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(lessOrEqual(1, true).toString()).toBe("1=le=true");
  expect(lessOrEqual("field", null).toString()).toBe("field=le=null");
  expect(lessOrEqual("field", nothing).toString()).toBe("field=le=undefined");
  expect(lessOrEqual("field", 10n).toString()).toBe("field=le=10");
  expect(lessOrEqual("field", { toString: () => "custom" }).toString()).toBe("field=le=custom");
});

test("lessOrEqual keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = lessOrEqual("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("lessOrEqual keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = lessOrEqual(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
