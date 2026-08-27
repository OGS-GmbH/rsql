import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { iin } from "./in.js";

test("iin serializes with the default separator", () => {
  const node = iin("field", "value");

  expect(node.toString()).toBe("field=in=value");
});

test("iin serializes with a custom separator", () => {
  const node = iin("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("iin exposes the node kind and both stringified and raw values", () => {
  const node = iin("field", 10);

  expect(node.kind).toBe("in");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=in=",
    rawSeparator: "=in="
  });
});

test("iin stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(iin(1, true).toString()).toBe("1=in=true");
  expect(iin("field", null).toString()).toBe("field=in=null");
  expect(iin("field", nothing).toString()).toBe("field=in=undefined");
  expect(iin("field", 10n).toString()).toBe("field=in=10");
  expect(iin("field", { toString: () => "custom" }).toString()).toBe("field=in=custom");
});

test("iin keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = iin("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("iin keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = iin(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
