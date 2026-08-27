import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { greaterOrEqual } from "./greater-or-equal.js";

test("greaterOrEqual serializes with the default separator", () => {
  const node = greaterOrEqual("field", "value");

  expect(node.toString()).toBe("field=ge=value");
});

test("greaterOrEqual serializes with a custom separator", () => {
  const node = greaterOrEqual("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("greaterOrEqual exposes the node kind and both stringified and raw values", () => {
  const node = greaterOrEqual("field", 10);

  expect(node.kind).toBe("greater-or-equal");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=ge=",
    rawSeparator: "=ge="
  });
});

test("greaterOrEqual stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(greaterOrEqual(1, true).toString()).toBe("1=ge=true");
  expect(greaterOrEqual("field", null).toString()).toBe("field=ge=null");
  expect(greaterOrEqual("field", nothing).toString()).toBe("field=ge=undefined");
  expect(greaterOrEqual("field", 10n).toString()).toBe("field=ge=10");
  expect(greaterOrEqual("field", { toString: () => "custom" }).toString()).toBe("field=ge=custom");
});

test("greaterOrEqual keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = greaterOrEqual("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("greaterOrEqual keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = greaterOrEqual(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
