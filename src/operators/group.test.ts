import { expect, test } from "vitest";
import { equals } from "./equals.js";
import { group } from "./group.js";
import { or } from "./or.js";

test("group wraps its child in the default parentheses", () => {
  const node = group(or([equals("field", "value"), equals("other-field", "other-value")]));

  expect(node.toString()).toBe("(field==value,other-field==other-value)");
});

test("group wraps its child in custom delimiters", () => {
  const node = group(equals("field", "value"), "[", "]");

  expect(node.toString()).toBe("[field==value]");
});

test("group exposes the node kind, both delimiter values and its child", () => {
  const child = equals("field", "value");

  const node = group(child);

  expect(node.kind).toBe("group");
  expect(node.children).toEqual([child]);
  expect(node.value).toEqual({
    open: "(",
    rawOpen: "(",
    close: ")",
    rawClose: ")"
  });
});

test("group nests into other groups", () => {
  const node = group(group(equals("field", "value")));

  expect(node.toString()).toBe("((field==value))");
});

test("group keeps stringable delimiters as both stringified and raw values", () => {
  const open = { toString: () => "[" };
  const close = { toString: () => "]" };

  const node = group(equals("field", "value"), open, close);

  expect(node.toString()).toBe("[field==value]");
  expect(node.value.open).toBe("[");
  expect(node.value.rawOpen).toBe(open);
  expect(node.value.close).toBe("]");
  expect(node.value.rawClose).toBe(close);
});
