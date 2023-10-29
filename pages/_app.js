import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '@/theme';
import { StoreProvider } from '@/utils/Store';
import { SnackbarProvider } from 'notistack';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export default function App({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <StoreProvider>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}
