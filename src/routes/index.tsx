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
import Waitlist from '../pages/waitlist';
import WaitlistSuccess from '../pages/waitlist/success';
import SignUp from '../pages/auth/signup';
import CompanyOnboarding from '../pages/auth/company';
import SignupSuccess from '../pages/auth/signup-success';
import SignupFailure from '../pages/auth/signup-fail';
import Login from '../pages/auth/login';
import ForgotDomain from '../pages/auth/forgot-domain';
import ForgotDomainSuccess from '../pages/auth/forgot-domain-success';

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
        path: PageRoutes.joinWaitlist,
        children: [
          {
            index: true,
            element: <Waitlist />,
          },
          {
            path: PageRoutes.waitlistSuccess,
            element: <WaitlistSuccess />,
          },
        ],
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
        path: PageRoutes.login,
        element: <Login />,
      },
      {
        path: PageRoutes.forgotDomain,
        element: <ForgotDomain />,
      },
      {
        path: PageRoutes.forgotDomainSuccess,
        element: <ForgotDomainSuccess />,
      },
      {
        path: PageRoutes.signup,
        element: <SignUp />,
      },
      {
        path: PageRoutes.signupSuccess,
        element: <SignupSuccess />,
      },
      {
        path: PageRoutes.signupFailure,
        element: <SignupFailure />,
      },
      {
        path: PageRoutes.companyOnboarding,
        element: <CompanyOnboarding />,
      },
      {
        path: PageRoutes.notFound,
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
