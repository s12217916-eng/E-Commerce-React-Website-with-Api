import { RouterProvider } from 'react-router';
import router from './router.jsx';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCounterStore from './store/useCounterStore.jsx';
const queryClient = new QueryClient(); 

function App() {
  return (
    <>
    <useCounterStore/>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  );
}

export default App;