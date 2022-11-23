import { Config } from './types';
import { generateUniqueId, parseStyle } from './utils';

let styleElement: HTMLStyleElement;
let config: Config = {
  prefix: 'g',
  createElement: undefined,
  forwardRef: undefined,
  shouldForwardProp: undefined
};

let styleMap = new Map<string, string>();

const setup = (setupConfig: Config = {}): void => {
  config = { ...config, ...setupConfig };

  styleElement = document.createElement('style');
  styleElement.setAttribute('id', config?.prefix || '');
  document.head.appendChild(styleElement);
};

const styled = (tag: string, styles: any, forwardRef = true) => {
  const { createElement, forwardRef: forwardRefFn, prefix, shouldForwardProp } = config

  function Component<T>(props: T, ref = undefined) {
    const styleObject = typeof styles === 'function' ? styles(props): styles;
    const parsedStyleObject = parseStyle(styleObject)
    let className = '', passedProps = {} as T

    for (const key in parsedStyleObject) {
      const value = parsedStyleObject[key]
      const styleString = `${key}{${value}}`
      let styleClassName;

      if (styleMap.has(styleString)) {
        styleClassName = styleMap.get(styleString);
      } else {
        styleClassName = generateUniqueId(prefix || '');
        styleMap.set(styleString, styleClassName);
        styleElement.sheet?.insertRule(styleString.replace(/&/g, `.${styleClassName}`));
      }

      className = className + ' ' + styleClassName
    }

    if (shouldForwardProp) {
      for (const key in props) {
        if ((shouldForwardProp)(key)) passedProps[key] = props[key]
      }
    } else passedProps = props

    return (createElement)(tag, { ...passedProps, ref, className: className.trim() })
  }

  return forwardRef && forwardRefFn ? (forwardRefFn)(Component) : Component;
}

const injectStyle = (style: string): void => {
  if (styleElement) styleElement.sheet?.insertRule(style)
}

export { styled, setup, injectStyle };
