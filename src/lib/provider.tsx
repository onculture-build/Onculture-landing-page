import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import theme from './theme';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReduxProvider> */}
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
      {/* </ReduxProvider> */}
    </QueryClientProvider>
  );
};

export default Provider;
