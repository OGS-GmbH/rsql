import { expect, test } from "vitest";
import type { Stringable } from "../types.js";
import { notEquals } from "./not-equals.js";

test("notEquals serializes with the default separator", () => {
  const node = notEquals("field", "value");

  expect(node.toString()).toBe("field!=value");
});

test("notEquals serializes with a custom separator", () => {
  const node = notEquals("field", "value", "=custom=");

  expect(node.toString()).toBe("field=custom=value");
});

test("notEquals exposes the node kind and both stringified and raw values", () => {
  const node = notEquals("field", 10);

  expect(node.kind).toBe("not-equals");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: "10",
    rawQuery: 10,
    separator: "!=",
    rawSeparator: "!="
  });
});

test("notEquals stringifies every stringable input", () => {
  const nothing: Stringable = undefined;

  expect(notEquals(1, true).toString()).toBe("1!=true");
  expect(notEquals("field", null).toString()).toBe("field!=null");
  expect(notEquals("field", nothing).toString()).toBe("field!=undefined");
  expect(notEquals("field", 10n).toString()).toBe("field!=10");
  expect(notEquals("field", { toString: () => "custom" }).toString()).toBe("field!=custom");
});

test("notEquals keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "=custom=" };

  const node = notEquals("field", "value", separator);

  expect(node.toString()).toBe("field=custom=value");
  expect(node.value.separator).toBe("=custom=");
  expect(node.value.rawSeparator).toBe(separator);
});

test("notEquals keeps stringable column and query as raw values", () => {
  const column = { toString: () => "field" };

  const node = notEquals(column, 10n);

  expect(node.value.column).toBe("field");
  expect(node.value.rawColumn).toBe(column);
  expect(node.value.query).toBe("10");
  expect(node.value.rawQuery).toBe(10n);
});
