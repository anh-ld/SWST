import { generateUniqueId, parseStyle } from './utils';

let styleElement: HTMLStyleElement;
let config = {
  classNamePrefix: 'g',
  createElement: undefined,
  forwardRef: undefined,
  styleTagId: 'g',
  shouldForwardProp: undefined
};

let styleMap = new Map();

const setup = (setupConfig = {}) => {
  config = { ...config, ...setupConfig };

  styleElement = document.createElement('style');
  styleElement.setAttribute('id', config.styleTagId);
  document.head.appendChild(styleElement);
};

const styled = (tag: string, styles: any, forwardRef = true) => {
  const { createElement, forwardRef: forwardRefFn, classNamePrefix, shouldForwardProp } = config

  function Component<T>(props: T, ref = undefined) {
    const styleObject = typeof styles === 'function' ? styles(props): styles;
    const parsedStyleObject = parseStyle(styleObject)
    let className = '', passedProps = {} as any

    for (const key in parsedStyleObject) {
      const value = parsedStyleObject[key]
      const styleString = `${key}{${value}}`
      let styleClassName;

      if (styleMap.has(styleString)) {
        styleClassName = styleMap.get(styleString);
      } else {
        styleClassName = generateUniqueId(classNamePrefix);
        styleMap.set(styleString, styleClassName);
        (styleElement.sheet as CSSStyleSheet).insertRule(styleString.replace(/&/g, `.${styleClassName}`));
      }

      className = className + ' ' + styleClassName
    }


    if (shouldForwardProp) {
      for (const key in props) {
        if ((shouldForwardProp as any)(key)) passedProps[key] = props[key]
      }
    } else passedProps = props

    return (createElement as any)(tag, { ...passedProps, ref, className: className.trim() })
  }

  return forwardRef && forwardRefFn ? (forwardRefFn as any)(Component) : Component;
}

export { styled, setup };
