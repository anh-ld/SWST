import { generateUniqueId, parseStyle } from './utils';

let styleElement: HTMLStyleElement;
let config = {
  prefix: 'g',
  createElement: undefined,
  forwardRef: undefined
};

let styleMap = new Map();

const setup = (setupConfig = {}) => {
  config = { ...config, ...setupConfig };

  styleElement = document.createElement('style');
  styleElement.setAttribute('id', config.prefix);
  document.head.appendChild(styleElement);
};

const styled = (tag: string, styles: any) => {
  const { createElement, forwardRef, prefix } = config

  function Component<T>(props: T, ref = undefined) {
    const styleObject = typeof styles === 'function' ? styles(props): styles;
    const parsedStyleObject = parseStyle(styleObject)
    let className = ''

    Object.entries(parsedStyleObject).map(([key, value]) => {
      const styleString = `${key}{${value}}`
      let styleClassName;

      if (styleMap.has(styleString)) {
        styleClassName = styleMap.get(styleString);
      } else {
        styleClassName = generateUniqueId(prefix);
        styleMap.set(styleString, styleClassName);
        (styleElement.sheet as CSSStyleSheet).insertRule(styleString.replace(/&/g, `.${styleClassName}`));
      }

      className = className + ' ' + styleClassName
    })

    return (createElement as any)(tag, { ...props, ref, className: className.trim() })
  }

  return forwardRef ? (forwardRef as any)(Component) : Component;
}

export { styled, setup };
