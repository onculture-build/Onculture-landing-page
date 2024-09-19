import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import theme from './theme';
import OncultureLoader from '../layouts/loading/onculture-loading';
import { store, persistedStore } from '../services/store';
import { PersistGate } from 'redux-persist/integration/react';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={<OncultureLoader />} persistor={persistedStore}>
          <ChakraProvider theme={theme}>
            <Toaster
              position='top-right'
              toastOptions={{
                duration: 5000,
                success: {
                  style: {
                    background: 'green',
                    color: 'white',
                  },
                },
                error: {
                  style: {
                    background: '#ab0000',
                    color: 'white',
                  },
                },
              }}
            />
            {children}
          </ChakraProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default Provider;
