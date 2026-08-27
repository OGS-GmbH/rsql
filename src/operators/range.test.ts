import { expect, test } from "vitest";
import { range } from "./range.js";

test("range serializes with the default separators", () => {
  const node = range("field", 1, 10);

  expect(node.toString()).toBe("field=rng=1,10");
});

test("range serializes with custom separators", () => {
  const node = range("field", 1, 10, "=between=", "..");

  expect(node.toString()).toBe("field=between=1..10");
});

test("range exposes the node kind and both stringified and raw values", () => {
  const node = range("field", 1, 10);

  expect(node.kind).toBe("range");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    from: "1",
    rawFrom: 1,
    to: "10",
    rawTo: 10,
    separator: "=rng=",
    rawSeparator: "=rng=",
    rangeSeparator: ",",
    rawRangeSeparator: ","
  });
});

test("range stringifies every stringable input", () => {
  const node = range({ toString: () => "field" }, null, 10n);

  expect(node.toString()).toBe("field=rng=null,10");
});

test("range keeps stringable separators as both stringified and raw values", () => {
  const separator = { toString: () => "=between=" };
  const rangeSeparator = { toString: () => ".." };

  const node = range("field", 1, 10, separator, rangeSeparator);

  expect(node.toString()).toBe("field=between=1..10");
  expect(node.value.separator).toBe("=between=");
  expect(node.value.rawSeparator).toBe(separator);
  expect(node.value.rangeSeparator).toBe("..");
  expect(node.value.rawRangeSeparator).toBe(rangeSeparator);
});

test("range keeps stringable bounds as both stringified and raw values", () => {
  const from = { toString: () => "1" };

  const node = range("field", from, 10n);

  expect(node.value.from).toBe("1");
  expect(node.value.rawFrom).toBe(from);
  expect(node.value.to).toBe("10");
  expect(node.value.rawTo).toBe(10n);
});
