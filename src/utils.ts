import { ParsedStyleObject } from './types';

export const parseStyle =
  (obj: unknown): ParsedStyleObject =>
  Object.entries(obj as any).reduce((acc: ParsedStyleObject, [key, value]) => {
    if (typeof value === 'object') {
      if (!acc[key]) acc[key] = ''

      acc[key] +=  parseStyle(value)['&']
    } else {
      acc['&'] += `${key.trim()}:${(String(value) as string).trim()};`
    }

    return acc
  }, {'&': ''})

export const generateUniqueId = (prefix: string): string =>
  prefix +
  (performance.now() + Math.random()).toString(36).split('.')[1];