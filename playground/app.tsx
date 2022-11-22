import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
import { setup, styled } from '../src/'
import { createElement } from 'preact'
import { forwardRef } from 'preact/compat';


setup({
  createElement,
  forwardRef,
})

export function App() {
  const [buttonColor, setButtonColor] = useState('red');

  const Button2 = styled('button', {
    color: 'blue',
    background: 'white',
    'font-weight': 'bold',
    padding: '10px',
    border: '2px solid green',
    outline: 'none',
    'border-radius': '8px',
    '&:hover': {
      background: 'blue'
    }
  })

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

      {/* <Button
        onClick={() => setButtonColor((c) => (c === 'red' ? 'blue' : 'red'))}
        color={buttonColor}
        backgroundColor="whitesmoke"
      >
        {buttonColor.toUpperCase()}
      </Button> */}
      <Button2>Hihi</Button2>
    </>
  )
}
