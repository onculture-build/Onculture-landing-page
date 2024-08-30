import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ErrorBoundary } from 'react-error-boundary';
import routes from './routes';
import ScrollToTop from './components/scroll-to-top';
import OncultureLoader from './layouts/loading/onculture-loading';
import { Flex } from '@chakra-ui/react';
import ErrorFallback from './error';

function App() {
  const routeResult = useRoutes(routes);

  return (
    <>
      {/* <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}`}
      > */}
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense
          fallback={
            <Flex
              w={'100vw'}
              h={'100vh'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <OncultureLoader />
            </Flex>
          }
        >
          <ScrollToTop>{routeResult}</ScrollToTop>
        </Suspense>
      </ErrorBoundary>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
