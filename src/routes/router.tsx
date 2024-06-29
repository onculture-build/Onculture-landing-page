import { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { BrowserRouterProps, Router } from 'react-router-dom';
import customHistory from './history';

interface Props extends BrowserRouterProps {
  history: BrowserHistory;
}

export const CustomRouter = ({ basename, history, children }: Props) => {
  const [state, setState] = useState({
    location: history.location,
    action: history.action,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      navigator={customHistory}
      location={state.location}
      navigationType={state.action}
      children={children}
      basename={basename}
    />
  );
};
