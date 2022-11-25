import { useState, useRef, useContext } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import { styled } from '../src/';
import { forwardRef } from 'preact/compat';
import { Theme } from './app';

const ImgStyle = {
  height: '6em',
  padding: '1.5em',
};

const StyledViteImg = styled('img', {
  ...ImgStyle,

  '&:hover': {
    filter: 'drop-shadow(0 0 2em #646cffaa)',
  },
});

const StyledPreactImg = styled('img', {
  ...ImgStyle,

  '&:hover, &:focus': {
    filter: 'drop-shadow(0 0 2em #673ab8aa)',
  },
});

const StyledCard = styled('div', {
  padding: '2em',
});

const StyledReadTheDocs = styled('p', {
  color: '#246ee4',
  'font-weight': 500,
  animation: 'pulse 1s infinite',
});

const StyledButton = styled(
  'button',
  (props: any, theme: any) => ({
    'border-radius': '8px',
    border: '1px solid transparent',
    padding: '0.6em 1.2em',
    'font-size': '1em',
    'font-weight': 500,
    'font-family': 'inherit',
    'background-color': props.$count % 2 === 0 ? '#d4a' : '#3b4',
    color: '#fff',
    cursor: 'pointer',
  }),
  forwardRef,
);

const StyledSwitchThemeButton = styled('button', (props: any, theme: any) => ({
  'border-radius': '8px',
  border: '1px solid transparent',
  padding: '0.6em 1.2em',
  'font-size': '1em',
  'font-weight': 500,
  'font-family': 'inherit',
  'background-color': '#11a',
  color: 'white',
  cursor: 'pointer',
}));

const StyledWrapper = styled('div', {
  'max-width': '1280px',
  margin: '0 auto',
  padding: '2rem',
  'text-align': 'center',
});

const Box = styled('div', (_: any, theme: any) => ({
  'background-color': theme.theme === 'light' ? '#fff' : '#000',
  width: '100vw',
  'min-height': '100vh',
  display: 'flex',
  'align-items': 'center',
}));

const Heading = styled('h1', (_: any, theme: any) => ({
  color: theme.theme === 'dark' ? '#fff' : '#000',
  'line-height': 1.1,
  'font-size': '2rem',
  transition: 'font-size 1s',

  '@media screen and (min-width: 768px)': {
    'font-size': '2.25rem',

    '&:hover': {
      'font-size': '2.5rem',
    },
  },
}));

function Child() {
  const { theme, setTheme } = useContext(Theme);
  const [count, setCount] = useState(0);
  const buttonRef = useRef();

  console.log('Button Ref', buttonRef.current);

  return (
    <Box>
      <StyledWrapper>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <StyledViteImg src="/vite.svg" alt="Vite logo" />
          </a>
          <a href="https://preactjs.com" target="_blank">
            <StyledPreactImg src={preactLogo} alt="Preact logo" />
          </a>
        </div>
        <Heading>Vite + Preact</Heading>
        <StyledCard>
          <StyledButton
            onClick={() => setCount(count => count + 1)}
            $count={count}
            ref={buttonRef}
            class="aaa"
          >
            count is {count}
          </StyledButton>
        </StyledCard>
        <div>
          <StyledSwitchThemeButton
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </StyledSwitchThemeButton>
        </div>
        <StyledReadTheDocs>
          open console and inspect element to view generated CSS classes
        </StyledReadTheDocs>
      </StyledWrapper>
    </Box>
  );
}

export default Child;
