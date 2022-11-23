### SWST

- Simple CSS in JS library for `React` and `Preact`.
- A proof-of-concept project, not meant to used in production.

#### Usage

```js
import { createElement } from 'preact';
import { forwardRef } from 'preact/compat';
import { styled, setup, injectStyle } from 'swst';

// init library
setup({
  createElement,
  forwardRef,
  shouldForwardProp: (name) => !name.startsWith('$'),
});

/*
  inject single style,
  for global styles, use plain CSS file instead
*/
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

const StyledCard = styled('div', {
  padding: '2em'
})

const StyledButton = styled('button', (props: any) => ({
  'background-color': props.$count % 2 === 0 ? '#d4a' : '#3b4',
}))

function App() {
  const [count, setCount] = useState(0)
  const buttonRef = useRef()

  console.log('Button Ref', buttonRef.current)

  return (
    <StyledCard>
      <StyledButton
        onClick={() => setCount((count) => count + 1)}
        $count={count}
        ref={buttonRef}
      >
        count is {count}
      </StyledButton>
    </StyledCard>
  )
}
```

#### TODO
- [ ] Extracts CSS in SSR mode.

#### Inspiration
- [goober](https://goober.rocks)
- [styletron](https://styletron.org/)