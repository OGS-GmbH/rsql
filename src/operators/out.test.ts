import { expect, test } from "vitest";
import { out } from "./out.js";

test("out serializes with the default separators", () => {
  const node = out("field", ["first", "second"]);

  expect(node.toString()).toBe("field=out=first,second");
});

test("out serializes with custom separators", () => {
  const node = out("field", ["first", "second"], "=notin=", "|");

  expect(node.toString()).toBe("field=notin=first|second");
});

test("out exposes the node kind and both stringified and raw values", () => {
  const node = out("field", [1, true]);

  expect(node.kind).toBe("out");
  expect(node.children).toBeUndefined();
  expect(node.value).toEqual({
    column: "field",
    rawColumn: "field",
    query: ["1", "true"],
    rawQuery: [1, true],
    separator: "=out=",
    rawSeparator: "=out=",
    querySeparator: ",",
    rawQuerySeparator: ","
  });
});

test("out stringifies every stringable input", () => {
  const node = out(
    { toString: () => "field" },
    [null, undefined, 10n],
    { toString: () => "=out=" },
    { toString: () => "," }
  );

  expect(node.toString()).toBe("field=out=null,undefined,10");
});

test("out serializes a single query value without a query separator", () => {
  const node = out("field", ["only"]);

  expect(node.toString()).toBe("field=out=only");
});

test("out serializes an empty query list as an empty query", () => {
  const node = out("field", []);

  expect(node.toString()).toBe("field=out=");
});

test("out keeps stringable separators as both stringified and raw values", () => {
  const separator = { toString: () => "=notin=" };
  const querySeparator = { toString: () => "|" };

  const node = out("field", ["first", "second"], separator, querySeparator);

  expect(node.toString()).toBe("field=notin=first|second");
  expect(node.value.separator).toBe("=notin=");
  expect(node.value.rawSeparator).toBe(separator);
  expect(node.value.querySeparator).toBe("|");
  expect(node.value.rawQuerySeparator).toBe(querySeparator);
});

test("out keeps the query list as both stringified and raw values", () => {
  const query = [1, true, null];

  const node = out("field", query);

  expect(node.value.query).toEqual(["1", "true", "null"]);
  expect(node.value.rawQuery).toBe(query);
});
