type Stringable = string | number | boolean | bigint | null | undefined | { toString(): string };

type Node<T = unknown> = {
  kind: string;
  value: T;
  children?: Node[];
  toString(): string;
};

type Operator<T = unknown> = (...args: string[]) => Node<T>;

export type { Stringable, Node, Operator };
