import { expect, test } from "vitest";
import { and } from "./and.js";
import { equals } from "./equals.js";
import { less } from "./less.js";

test("and joins its children with the default separator", () => {
  const node = and([equals("field", "value"), less("number-field", 10)]);

  expect(node.toString()).toBe("field==value;number-field=lt=10");
});

test("and joins its children with a custom separator", () => {
  const node = and([equals("field", "value"), equals("other-field", "other-value")], " AND ");

  expect(node.toString()).toBe("field==value AND other-field==other-value");
});

test("and exposes the node kind, the separator and its children", () => {
  const child = equals("field", "value");

  const node = and([child]);

  expect(node.kind).toBe("and");
  expect(node.children).toEqual([child]);
  expect(node.value).toEqual({
    separator: ";",
    rawSeparator: ";"
  });
});

test("and serializes a single child without a separator", () => {
  const node = and([equals("field", "value")]);

  expect(node.toString()).toBe("field==value");
});

test("and serializes an empty child list as an empty string", () => {
  const node = and([]);

  expect(node.toString()).toBe("");
});

test("and nests other logical nodes", () => {
  const node = and([equals("a", 1), and([equals("b", 2), equals("c", 3)])]);

  expect(node.toString()).toBe("a==1;b==2;c==3");
});

test("and keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => " AND " };

  const node = and([equals("field", "value"), equals("other-field", "other-value")], separator);

  expect(node.toString()).toBe("field==value AND other-field==other-value");
  expect(node.value.separator).toBe(" AND ");
  expect(node.value.rawSeparator).toBe(separator);
});
