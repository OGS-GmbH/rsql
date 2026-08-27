import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { equals } from "./equals.js";

test("equals serializes with the default separator", () => {
  const node = equals("field", "value");

  expect(node.toString()).toBe("field==value");
});

test("equals serializes with a custom separator", () => {
  const node = equals("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("equals exposes the node kind and both stringified and raw values", () => {
  const node = equals("field", 10);

  expect(node.kind).toBe("equals");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "==",
    rawSeparator: "=="
  });
});

test("equals stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(equals(1, true).toString()).toBe("1==true");
  expect(equals("field", null).toString()).toBe("field==null");
  expect(equals("field", nothing).toString()).toBe("field==undefined");
  expect(equals("field", 10n).toString()).toBe("field==10");
  expect(equals("field", { toString: () => "custom" }).toString()).toBe("field==custom");
});

test("equals keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = equals("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("equals keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = equals(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
