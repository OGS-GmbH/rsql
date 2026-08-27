import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { query } from "./query.js";

test("query serializes with the default separator", () => {
  const node = query("field", "value");

  expect(node.toString()).toBe("field=q=value");
});

test("query serializes with a custom separator", () => {
  const node = query("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("query exposes the node kind and both stringified and raw values", () => {
  const node = query("field", 10);

  expect(node.kind).toBe("query");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=q=",
    rawSeparator: "=q="
  });
});

test("query stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(query(1, true).toString()).toBe("1=q=true");
  expect(query("field", null).toString()).toBe("field=q=null");
  expect(query("field", nothing).toString()).toBe("field=q=undefined");
  expect(query("field", 10n).toString()).toBe("field=q=10");
  expect(query("field", { toString: () => "custom" }).toString()).toBe("field=q=custom");
});

test("query keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = query("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("query keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = query(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
