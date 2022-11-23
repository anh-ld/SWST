import { useState, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import { setup, styled, injectStyle } from '../src/'
import { createElement } from 'preact'
import { forwardRef } from 'preact/compat';

setup({
  createElement,
  forwardRef,
  shouldForwardProp: (name) => !name.startsWith('$')
})

injectStyle(`
@keyframes pulse {
	0% {
		transform: scale(0.95);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.95);
	}
}
`)

const ImgStyle = {
  height: '6em',
  padding: '1.5em',
}

const StyledViteImg = styled('img', {
  ...ImgStyle,

  '&:hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)'
  }
})

const StyledPreactImg = styled('img', {
  ...ImgStyle,

  '&:hover': {
    filter: 'drop-shadow(0 0 2em #673ab8aa)'
  }
})

const StyledCard = styled('div', {
  padding: '2em'
})

const StyledReadTheDocs = styled('p', {
  color: '#246ee4',
  'font-weight': 500,
  animation: 'pulse 1s infinite',

})

const StyledButton = styled('button', (props: any) => ({
  'border-radius': '8px',
  border: '1px solid transparent',
  padding: '0.6em 1.2em',
  'font-size': '1em',
  'font-weight': 500,
  'font-family': 'inherit',
  'background-color': props.$count % 2 === 0 ? '#d4a' : '#3b4',
  cursor: 'pointer'
}))

export function App() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef()

  console.log('Button Ref', buttonRef.current)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <StyledViteImg src="/vite.svg" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <StyledPreactImg src={preactLogo} alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <StyledCard>
        <StyledButton
          onClick={() => setCount((count) => count + 1)}
          $count={count}
          ref={buttonRef}
        >
          count is {count}
        </StyledButton>
      </StyledCard>
      <StyledReadTheDocs>
        open console and inspect element to view generated CSS classes
      </StyledReadTheDocs>
    </>
  )
}
