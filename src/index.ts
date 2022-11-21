import { generateUniqueId, getStyleStringFromTemplate } from './utils';
import type { ApplyPropsFn } from "./types";

let styleElement: HTMLStyleElement;
let config = {
  prefix: 'gbr',
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

const styled =
  (tag: string) =>
  (string: TemplateStringsArray, ...keys: ApplyPropsFn[]) => {
    const { forwardRef, createElement, prefix } = config;

    function Component<T>(props: T, ref = undefined) {
      /* generate style string */
      const styleString = getStyleStringFromTemplate(string, ...keys)(props);
      let styleClassName;

      /* if style is already existed, get from map, else generate new className */
      if (styleMap.has(styleString)) {
        styleClassName = styleMap.get(styleString);
      } else {
        styleClassName = generateUniqueId(prefix);
        styleMap.set(styleString, styleClassName);
        (styleElement.sheet as CSSStyleSheet).insertRule(`.${styleClassName}{${styleString}}`);
      }

      return (createElement as any)(tag, { ...props, ref, className: styleClassName });
    }

    return forwardRef ? (forwardRef as any)(Component) : Component;
  };

export { styled, setup };
