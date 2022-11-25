import { ParsedStyleObject } from './types';

export const parseStyle =
  (obj: unknown): ParsedStyleObject =>
  Object.entries(obj as any).reduce((acc: ParsedStyleObject, [key, value]) => {
    if (typeof value === 'object') {
      if (key.startsWith('@media')) {
        const mediaStyle = parseStyle(value)

        for (const mediaStyleKey in mediaStyle) {
          const calcKey = `${key}{${mediaStyleKey}`
          if (!acc[calcKey]) acc[calcKey] = ''
          acc[calcKey] +=  mediaStyle[mediaStyleKey]
        }

      } else {
        if (!acc[key]) acc[key] = ''
        acc[key] +=  parseStyle(value)['&']
      }

    } else {
      acc['&'] += `${key.trim()}:${(String(value)).trim()};`
    }

    return acc
  }, {'&': ''})

export const generateUniqueId = (prefix: string): string =>
  prefix + "_" +
  (performance.now() + Math.random()).toString(36).split('.')[1];