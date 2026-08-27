import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { less } from "./less.js";

test("less serializes with the default separator", () => {
  const node = less("field", "value");

  expect(node.toString()).toBe("field=lt=value");
});

test("less serializes with a custom separator", () => {
  const node = less("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("less exposes the node kind and both stringified and raw values", () => {
  const node = less("field", 10);

  expect(node.kind).toBe("less");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=lt=",
    rawSeparator: "=lt="
  });
});

test("less stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(less(1, true).toString()).toBe("1=lt=true");
  expect(less("field", null).toString()).toBe("field=lt=null");
  expect(less("field", nothing).toString()).toBe("field=lt=undefined");
  expect(less("field", 10n).toString()).toBe("field=lt=10");
  expect(less("field", { toString: () => "custom" }).toString()).toBe("field=lt=custom");
});

test("less keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = less("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("less keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = less(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
