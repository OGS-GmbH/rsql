import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { greater } from "./greater.js";

test("greater serializes with the default separator", () => {
  const node = greater("field", "value");

  expect(node.toString()).toBe("field=gt=value");
});

test("greater serializes with a custom separator", () => {
  const node = greater("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("greater exposes the node kind and both stringified and raw values", () => {
  const node = greater("field", 10);

  expect(node.kind).toBe("greater");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=gt=",
    rawSeparator: "=gt="
  });
});

test("greater stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(greater(1, true).toString()).toBe("1=gt=true");
  expect(greater("field", null).toString()).toBe("field=gt=null");
  expect(greater("field", nothing).toString()).toBe("field=gt=undefined");
  expect(greater("field", 10n).toString()).toBe("field=gt=10");
  expect(greater("field", { toString: () => "custom" }).toString()).toBe("field=gt=custom");
});

test("greater keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = greater("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("greater keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = greater(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
