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

const queryClient = new QueryClient(); 

function App() {
const mode = useThemeStore((state)=>state.mode);
  return (
    <>
    <useCounterStore/>
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