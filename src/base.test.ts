import { expect, test } from "vitest";
import { and, define, equals, group, less, like, or, range } from "./public-api.js";

test("define RSQL query", () => {
  const definition = define(and([equals("field", "value"), less("number-field", 10)]));

  const query = definition.toString();

  expect(query).toBe("field==value;number-field=lt=10");
});

test("check RSQL AST", () => {
  const node = like("field", "value");

  const definition = define(or([node]));

  expect(definition.ast.kind).toBe("or");
  expect(definition.ast.value).toEqual({
    separator: ",",
    rawSeparator: ","
  });
  expect(definition.ast.children).toEqual([node]);
  expect(definition.ast.children?.[0]?.kind).toBe("like");
});

test("define keeps the passed node as its AST root", () => {
  const node = equals("field", "value");

  const definition = define(node);

  expect(definition.ast).toBe(node);
  expect(definition.toString()).toBe("field==value");
});

test("define serializes a deeply nested query", () => {
  const definition = define(
    and([
      group(or([equals("status", "active"), equals("status", "pending")])),
      range("age", 18, 65),
      like("name", "*son")
    ])
  );

  expect(definition.toString()).toBe(
    "(status==active,status==pending);age=rng=18,65;name=like=*son"
  );
});

test("define serializes a leaf node without any logical operator", () => {
  const definition = define(less("number-field", 10));

  expect(definition.toString()).toBe("number-field=lt=10");
});
