import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
import { setup, styled } from '../src/'
import { createElement } from 'preact'
import { forwardRef } from 'preact/compat';


setup({
  prefix: '',
  createElement,
  forwardRef,
})

export function App() {
  const [buttonColor, setButtonColor] = useState('red');

  const Button = styled('button')`
    color: ${(props: any) => props.color};
    background: ${(props: any) => props.backgroundColor};
    font-weight: bold;
  `;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>

      <Button
        onClick={() => setButtonColor((c) => (c === 'red' ? 'blue' : 'red'))}
        color={buttonColor}
        backgroundColor="yellow"
      >
        {buttonColor.toUpperCase()}
      </Button>
    </>
  )
}
