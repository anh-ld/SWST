import type { ApplyPropsFn } from "./types";

export const getStyleStringFromTemplate =
  (strings: TemplateStringsArray, ...keys: ApplyPropsFn[]) =>
  (props: any): string => {
    const result = keys.reduce((acc, key, index) => acc + key(props) + strings[index + 1], `${strings[0]}`)
    return result.replace(/ |\n/g, '');
  };

export const generateUniqueId = (prefix: string): string =>
  prefix +
  (performance.now() + Math.random()).toString(36).split('.')[1];