import type { Config, Styles } from './types';
import { generateUniqueId, parseStyle } from './utils';

let styleElement: HTMLStyleElement;
let config: Config = { prefix: 'swst' };
let styleMap = new Map<string, string>();
let serverStyleSheet: string[] = [];

const isServer = typeof window === 'undefined';

const setup = (setupConfig: Config = {}): void => {
  config = { ...config, ...setupConfig };

  if (!isServer) {
    const ssrStyleElement: HTMLStyleElement | null = document.querySelector(
      `#${config?.prefix}`,
    );

    if (ssrStyleElement) {
      styleElement = ssrStyleElement;
      const styleContent = ssrStyleElement.innerText;
      const rules = styleContent.match(/(.*?){.*?}/g) || [];

      for (const rule of rules) {
        const className = rule.match(/^.(\w|\d)*/g)?.[0] || '';
        const styleValue = rule.replaceAll(className, '&');
        styleMap.set(styleValue, className.slice(1));
      }
    } else {
      styleElement = document.createElement('style');
      styleElement.setAttribute('id', config?.prefix || '');
      document.head.appendChild(styleElement);
    }
  }
};

const styled = (tag: string, styles: Styles, forwardRefFn?: any) => {
  const Component = <T extends { class?: string }>(
    props: T,
    ref = undefined,
  ) => {
    const { createElement, prefix, shouldForwardProp, theme } = config;

    const themeStyle = theme && theme();
    const styleObject =
      typeof styles === 'function' ? styles(props, themeStyle) : styles;
    const parsedStyleObject = parseStyle(styleObject);

    let className = props.class || '',
      passedProps = {} as T;

    for (const key in parsedStyleObject) {
      const value = parsedStyleObject[key];
      const styleString = `${key}{${value}}`;
      let styleClassName;

      if (styleMap.has(styleString)) {
        styleClassName = styleMap.get(styleString);
      } else {
        styleClassName = generateUniqueId(prefix || '');
        styleMap.set(styleString, styleClassName);

        let cssRule = styleString.replace(/&/g, `.${styleClassName}`);

        if (isServer) serverStyleSheet.push(cssRule);
        else
          styleElement.sheet?.insertRule(
            cssRule,
            styleElement.sheet.cssRules.length,
          );
      }

      className = className + ' ' + styleClassName;
    }

    if (shouldForwardProp) {
      for (const key in props) {
        if (shouldForwardProp(key)) passedProps[key] = props[key];
      }
    } else passedProps = props;

    return createElement(tag, {
      ...passedProps,
      ref,
      className: className.trim(),
    });
  };

  return forwardRefFn ? forwardRefFn(Component) : Component;
};

const injectStyle = (style: string): void => {
  if (styleElement) styleElement.sheet?.insertRule(style);
};

const extractStyle = () => serverStyleSheet.join('');

export { styled, setup, injectStyle, extractStyle };
