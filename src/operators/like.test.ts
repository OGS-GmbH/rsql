import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { like } from "./like.js";

test("like serializes with the default separator", () => {
  const node = like("field", "value");

  expect(node.toString()).toBe("field=like=value");
});

test("like serializes with a custom separator", () => {
  const node = like("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("like exposes the node kind and both stringified and raw values", () => {
  const node = like("field", 10);

  expect(node.kind).toBe("like");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=like=",
    rawSeparator: "=like="
  });
});

test("like stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(like(1, true).toString()).toBe("1=like=true");
  expect(like("field", null).toString()).toBe("field=like=null");
  expect(like("field", nothing).toString()).toBe("field=like=undefined");
  expect(like("field", 10n).toString()).toBe("field=like=10");
  expect(like("field", { toString: () => "custom" }).toString()).toBe("field=like=custom");
});

test("like keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = like("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("like keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = like(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
