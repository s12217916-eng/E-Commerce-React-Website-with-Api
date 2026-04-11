import { RouterProvider } from 'react-router';
import router from './router.jsx';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCounterStore from './store/useCounterStore.jsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.jsx';
import { CssBaseline } from '@mui/material';
import getTheme from './theme.jsx';
import useThemeStore from './useThemeStore.jsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  },
    [i18n.language]
  )
  const mode = useThemeStore((state) => state.mode);
  return (
    <>
      <useCounterStore />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;