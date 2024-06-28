import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { PageRoutes } from '../lib/constants';
import Contact from '../pages/contact';
import Faq from '../pages/faq';
import Home from '../pages/home';
import Pricing from '../pages/pricing';
import Resources from '../pages/resources';
import BookDemo from '../pages/book-demo';
import SingleArticle from '../pages/resources/article/[id]';
import SingleBook from '../pages/resources/book/[id]';
import TemplateInfo from '../pages/template/[id]';
import ProgramInfo from '../pages/programs/[id]';
import TemplatesPage from '../pages/template';
import Layout from '../layouts/layout';

const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PageRoutes.faq,
        element: <Faq />,
      },
      {
        path: PageRoutes.templates,
        children: [
          {
            index: true,
            element: <TemplatesPage />,
          },
          {
            path: PageRoutes.template,
            element: <TemplateInfo />,
          },
        ],
      },
      {
        path: PageRoutes.pricing,
        element: <Pricing />,
      },
      {
        path: PageRoutes.contact,
        element: <Contact />,
      },
      {
        path: PageRoutes.bookDemo,
        element: <BookDemo />,
      },
      {
        path: PageRoutes.programs,
        element: <ProgramInfo />,
      },
      {
        path: PageRoutes.resources,
        children: [
          {
            index: true,
            element: <Resources />,
          },
          {
            path: PageRoutes.article,
            element: <SingleArticle />,
          },
          {
            path: PageRoutes.book,
            element: <SingleBook />,
          },
        ],
      },
      {
        path: PageRoutes.notFound,
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
