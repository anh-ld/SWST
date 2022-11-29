### SWST

- Simple CSS in JS library for `React` and `Preact`.
- A proof-of-concept project, not meant to used in production.

#### Preview

- CSR: [swst.vercel.app](https://swst.vercel.app/)
- SSR: [swst-ssr.sfns.workers.dev](https://swst-ssr.sfns.workers.dev/)

#### Installation

Add `.npmrc` into project

```bash
@culee:registry=https://npm.pkg.github.com
```

```bash
npm install @culee/swst
```

#### Usage

```js
import { createElement } from 'preact';
import { forwardRef } from 'preact/compat';
import { styled, setup, injectStyle } from '@culee/swst';
import { useContext, useState } from 'preact/hooks';

// init library
setup({
  createElement,
  shouldForwardProp: name => !name.startsWith('$'),
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
`);

const StyledCard = styled('div', {
  padding: '2em',
});

const StyledButton = styled(
  'button',
  (props: any) => ({
    'background-color': props.$count % 2 === 0 ? '#d4a' : '#3b4',
  }),
  forwardRef,
);

const StyledHeading = styled('div', {
  'font-size': '2rem',
  transition: 'font-size 1s',

  '@media screen and (min-width: 768px)': {
    'font-size': '2.25rem',

    '&:hover': {
      'font-size': '2.5rem',
    },
  },
});

function App() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef();

  console.log('Button Ref', buttonRef.current);

  return (
    <StyledCard>
      <StyledHeading>Styled Counter</StyledHeading>
      <StyledButton
        onClick={() => setCount(count => count + 1)}
        $count={count}
        ref={buttonRef}
      >
        count is {count}
      </StyledButton>
    </StyledCard>
  );
}
```

- SSR

```html
// index.html
<style id="swst">
  <!--app-css-->
</style>
```

```js
// server.js
import { extractStyle } from 'swst';

app.use('*', (req, res) => {
  ...

  const appCss = extractStyle();
  template = htmlTemplate.replace(`<!--app-css-->`, appCss)

  return template
})
```

#### TODO

- [x] Extracts CSS in SSR mode.
- [x] Media Query
- [ ]  Vendor prefix
- [ ]  Atomic CSS

#### Inspiration

- [goober](https://goober.rocks)
- [styletron](https://styletron.org/)

#### Thoughtful articles and videos

- [Building the New Facebook with React and Relay | Frank Yan](https://www.youtube.com/watch?v=9JZHodNR184)
- [Atomic CSS-in-JS](https://sebastienlorber.com/atomic-css-in-js)
- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
- [A Thorough Analysis of CSS-in-JS](https://css-tricks.com/a-thorough-analysis-of-css-in-js/)
- [The unseen performance costs of modern CSS-in-JS libraries in React apps](https://calendar.perfplanet.com/2019/the-unseen-performance-costs-of-css-in-js-in-react-apps/)