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
    </>
  );
}

export default App;
