/** Nested message dictionary loaded from messages/*.json */
export type Dictionary = {
  [key: string]: string | string[] | Dictionary | Dictionary[] | undefined;
};

export type Translator = {
  (key: string, params?: Record<string, string | number>): string;
  raw: (key: string) => unknown;
  locale: string;
};
