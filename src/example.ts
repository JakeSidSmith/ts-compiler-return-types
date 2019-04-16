export type StringOrNumber = string | number;
export type StringOrNumberOrNull = StringOrNumber | null;

export function exampleUnionInline1(): string | null {
  return null as any;
}

export function exampleUnionInline2(): string | number | null {
  return null as any;
}

export function exampleUnionOfUnions(): StringOrNumber | null {
  return null as any;
}

export function exampleUnionAlias(): StringOrNumberOrNull {
  return null as any;
}
