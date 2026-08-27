import { expect, test } from "vitest";
import { equals } from "./equals.js";
import { or } from "./or.js";

test("or joins its children with the default separator", () => {
  const node = or([equals("field", "value"), equals("other-field", "other-value")]);

  expect(node.toString()).toBe("field==value,other-field==other-value");
});

test("or joins its children with a custom separator", () => {
  const node = or([equals("field", "value"), equals("other-field", "other-value")], " OR ");

  expect(node.toString()).toBe("field==value OR other-field==other-value");
});

test("or exposes the node kind, both separator values and its children", () => {
  const child = equals("field", "value");

  const node = or([child]);

  expect(node.kind).toBe("or");
  expect(node.children).toEqual([child]);
  expect(node.value).toEqual({
    separator: ",",
    rawSeparator: ","
  });
});

test("or keeps a stringable separator as both stringified and raw value", () => {
  const separator = { toString: () => "|" };

  const node = or([equals("field", "value"), equals("other-field", "other-value")], separator);

  expect(node.toString()).toBe("field==value|other-field==other-value");
  expect(node.value.separator).toBe("|");
  expect(node.value.rawSeparator).toBe(separator);
});

test("or serializes an empty child list as an empty string", () => {
  const node = or([]);

  expect(node.toString()).toBe("");
});
