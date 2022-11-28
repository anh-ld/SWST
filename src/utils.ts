import { ParsedStyleObject } from './types';

export const isServer = typeof window === 'undefined';

export const parseStyle = (obj: unknown): ParsedStyleObject =>
  Object.entries(obj as any).reduce(
    (acc: ParsedStyleObject, [key, value]) => {
      /* object properties */
      if (typeof value === 'object') {
        /* media query properties */
        if (key.startsWith('@media')) {
          const mediaStyle = parseStyle(value);

          for (const mediaStyleKey in mediaStyle) {
            const calcKey = `${key}{${mediaStyleKey}`;
            if (!acc[calcKey]) acc[calcKey] = '';
            acc[calcKey] += mediaStyle[mediaStyleKey];
          }
        } else {
        /* pseudo properties */
          if (!acc[key]) acc[key] = '';
          acc[key] += parseStyle(value)['&'];
        }
      } else {
      /* normal properties */
        acc['&'] += `${key.trim()}:${String(value).trim()};`;
      }

      return acc;
    },
    { '&': '' },
  );

export const generateUniqueId = (prefix: string): string =>
  prefix + '_' + (performance.now() + Math.random()).toString(36).split('.')[1];

export const insertRule = (
  cssRule: string,
  styleElement: HTMLStyleElement,
  serverStyleSheet: string[],
): void => {
  if (isServer) serverStyleSheet.push(cssRule);
  else if (styleElement)
    styleElement.sheet?.insertRule(cssRule, styleElement.sheet.cssRules.length);
};
