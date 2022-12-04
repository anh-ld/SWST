import { useState, useRef, useContext } from 'preact/hooks';
import { styled } from '../src/';
import { forwardRef } from 'preact/compat';
import { Theme } from './app';
import DATA from './data.json';

const NewQuoteButton = styled(
  'button',
  (props: any, theme: any) => ({
    'border-radius': '8px',
    border: '1px solid transparent',
    padding: '0.4em 0.8em',
    'font-size': '1em',
    'font-weight': 500,
    'font-family': 'inherit',
    'background-color': theme.theme === 'dark' ? '#f5f5f5' : '#262626',
    color: theme.theme === 'dark' ? '#171717' : '#fafafa',
    cursor: 'pointer',
    'margin-top': '20px',

    '&:hover': {
      'background-color': theme.theme === 'dark' ? '#e5e5e5' : '#404040',
    },

    '@media screen and (min-width: 768px)': {
      padding: '0.6em 1.2em',
      'background-color': theme.theme === 'dark' ? '#f5f5f5' : '#262626',
    },
  }),
  forwardRef,
);

const SwitchThemeButton = styled('button', (props: any, theme: any) => ({
  padding: '0',
  border: 'none',
  'font-size': '3em',
  color: 'white',
  cursor: 'pointer',
  'margin-top': '20px',
  'background-color': 'transparent',
}));

const Box = styled('div', (_: any, theme: any) => ({
  'background-color': theme.theme === 'light' ? '#fafafa' : '#171717',
  'min-height': '100vh',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  padding: '24px',
}));

const InnerBox = styled('div', (_: any, theme: any) => ({
  'text-align': 'center',
  'max-width': '800px',
}));

const Quote = styled('h1', (_: any, theme: any) => ({
  'font-size': '24px',
  'font-weight': 'bold',
  'font-family': 'ui-sans-serif , system-ui, sans-serif',
  'line-height': 1.25,

  '@media screen and (min-width: 768px)': {
    'font-size': '36px',
    color: theme.theme === 'dark' ? '#fafafa' : '#171717',
  },

  color: theme.theme === 'dark' ? '#fafafa' : '#171717',
}));

const Author = styled('h2', (_: any, theme: any) => ({
  'font-size': '16px',
  'font-weight': 500,
  'font-family': 'ui-sans-serif , system-ui, sans-serif',
  color: theme.theme === 'dark' ? '#d4d4d4' : '#525252',
}));

function Child() {
  const { theme, setTheme } = useContext(Theme);
  const [quote, setQuote] = useState(
    () => DATA[Math.floor(Math.random() * DATA.length)],
  );
  const buttonRef = useRef();

  console.log('Button Ref', buttonRef.current);

  const changeQuote = () => {
    let newQuote = { id: -1, quote: '', author: '' };

    while (newQuote?.id === -1 || newQuote?.id === quote.id) {
      newQuote = DATA[Math.floor(Math.random() * DATA.length)];
    }

    setQuote(newQuote);
  };

  return (
    <Box>
      <InnerBox>
        <Quote>"{quote.quote}"</Quote>
        <Author>{quote.author}</Author>
        <NewQuoteButton ref={buttonRef} onClick={changeQuote}>
          New Quote
        </NewQuoteButton>
        <div>
          <SwitchThemeButton
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🏙' : '🌃'}
          </SwitchThemeButton>
        </div>
      </InnerBox>
    </Box>
  );
}

export default Child;
