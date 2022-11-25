import { setup, injectStyle } from '../src/';
import { createElement, createContext } from 'preact';
import Child from './child';
import { useContext, useState } from 'preact/hooks';

export const Theme = createContext(null as any);

setup({
  createElement,
  shouldForwardProp: name => !name.startsWith('$'),
  theme: () => useContext(Theme),
});

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

export function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <Theme.Provider value={{ theme, setTheme }}>
      <Child />
    </Theme.Provider>
  );
}
