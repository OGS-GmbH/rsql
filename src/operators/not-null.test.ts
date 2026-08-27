import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { nulll } from "./not-null.js";

test("nulll serializes with the default separator", () => {
  const node = nulll("field", "value");

  expect(node.toString()).toBe("field=null=value");
});

test("nulll serializes with a custom separator", () => {
  const node = nulll("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("nulll exposes the node kind and both stringified and raw values", () => {
  const node = nulll("field", 10);

  expect(node.kind).toBe("null");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=null=",
    rawSeparator: "=null="
  });
});

test("nulll stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(nulll(1, true).toString()).toBe("1=null=true");
  expect(nulll("field", null).toString()).toBe("field=null=null");
  expect(nulll("field", nothing).toString()).toBe("field=null=undefined");
  expect(nulll("field", 10n).toString()).toBe("field=null=10");
  expect(nulll("field", { toString: () => "custom" }).toString()).toBe("field=null=custom");
});

test("nulll keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = nulll("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("nulll keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = nulll(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
