import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { notLike } from "./not-like.js";

test("notLike serializes with the default separator", () => {
  const node = notLike("field", "value");

  expect(node.toString()).toBe("field=notlike=value");
});

test("notLike serializes with a custom separator", () => {
  const node = notLike("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("notLike exposes the node kind and both stringified and raw values", () => {
  const node = notLike("field", 10);

  expect(node.kind).toBe("not-like");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=notlike=",
    rawSeparator: "=notlike="
  });
});

test("notLike stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(notLike(1, true).toString()).toBe("1=notlike=true");
  expect(notLike("field", null).toString()).toBe("field=notlike=null");
  expect(notLike("field", nothing).toString()).toBe("field=notlike=undefined");
  expect(notLike("field", 10n).toString()).toBe("field=notlike=10");
  expect(notLike("field", { toString: () => "custom" }).toString()).toBe("field=notlike=custom");
});

test("notLike keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = notLike("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("notLike keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = notLike(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
