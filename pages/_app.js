import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '@/theme';
import { StoreProvider } from '@/utils/Store';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </StoreProvider>
  );
}
