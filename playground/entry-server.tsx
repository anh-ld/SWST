import renderToString from 'preact-render-to-string';
import { App } from './app'
import { extractStyle } from '../src';

export function render() {
  return renderToString(<App />)
}

export function renderCss() {
  return extractStyle()
}