import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { isNull } from "./is-null.js";

test("isNull serializes with the default separator", () => {
  const node = isNull("field", "value");

  expect(node.toString()).toBe("field=isnull=value");
});

test("isNull serializes with a custom separator", () => {
  const node = isNull("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("isNull exposes the node kind and both stringified and raw values", () => {
  const node = isNull("field", 10);

  expect(node.kind).toBe("is-null");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "=isnull=",
    rawSeparator: "=isnull="
  });
});

test("isNull stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(isNull(1, true).toString()).toBe("1=isnull=true");
  expect(isNull("field", null).toString()).toBe("field=isnull=null");
  expect(isNull("field", nothing).toString()).toBe("field=isnull=undefined");
  expect(isNull("field", 10n).toString()).toBe("field=isnull=10");
  expect(isNull("field", { toString: () => "custom" }).toString()).toBe("field=isnull=custom");
});

test("isNull keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = isNull("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("isNull keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = isNull(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
