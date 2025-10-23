import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { PageRoutes } from '../lib/constants';
import Layout from '../layouts/layout';
import Home from '../pages/home';

const Contact = lazy(() => import('../pages/contact'));
const Faq = lazy(() => import('../pages/faq'));
const Pricing = lazy(() => import('../pages/pricing'));
const Resources = lazy(() => import('../pages/resources'));
const BookDemo = lazy(() => import('../pages/book-demo'));
const SingleArticle = lazy(() => import('../pages/resources/article/[id]'));
const SingleBook = lazy(() => import('../pages/resources/book/[id]'));
const TemplateInfo = lazy(() => import('../pages/template/[id]'));
const ProgramInfo = lazy(() => import('../pages/programs/[id]'));
const TemplatesPage = lazy(() => import('../pages/template'));
const CoursesPage = lazy(() => import('../pages/courses'));
const CourseInfo = lazy(() => import('../pages/courses/[id]'));
const Waitlist = lazy(() => import('../pages/waitlist'));
const WaitlistSuccess = lazy(() => import('../pages/waitlist/success'));
const SignUp = lazy(() => import('../pages/auth/signup'));
const CompanyOnboarding = lazy(() => import('../pages/auth/company'));
const SignupSuccess = lazy(() => import('../pages/auth/signup-success'));
const SignupFailure = lazy(() => import('../pages/auth/signup-fail'));
const Login = lazy(() => import('../pages/auth/login'));
const ForgotDomain = lazy(() => import('../pages/auth/forgot-domain'));
const ForgotDomainSuccess = lazy(
  () => import('../pages/auth/forgot-domain-success')
);
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

export const routes: RouteObject[] = [
  {
    path: PageRoutes.home,
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: PageRoutes.faq, element: <Faq /> },
      { path: PageRoutes.pricing, element: <Pricing /> },
      { path: PageRoutes.contact, element: <Contact /> },
      { path: PageRoutes.bookDemo, element: <BookDemo /> },

      {
        path: PageRoutes.templates,
        children: [
          { index: true, element: <TemplatesPage /> },
          { path: PageRoutes.template, element: <TemplateInfo /> },
        ],
      },

      {
        path: PageRoutes.courses,
        children: [
          { index: true, element: <CoursesPage /> },
          { path: PageRoutes.course, element: <CourseInfo /> },
        ],
      },

      {
        path: PageRoutes.joinWaitlist,
        children: [
          { index: true, element: <Waitlist /> },
          { path: PageRoutes.waitlistSuccess, element: <WaitlistSuccess /> },
        ],
      },

      { path: PageRoutes.programs, element: <ProgramInfo /> },

      {
        path: PageRoutes.resources,
        children: [
          { index: true, element: <Resources /> },
          { path: PageRoutes.article, element: <SingleArticle /> },
          { path: PageRoutes.book, element: <SingleBook /> },
        ],
      },

      { path: PageRoutes.login, element: <Login /> },

      {
        path: PageRoutes.forgotDomain,
        children: [
          { index: true, element: <ForgotDomain /> },
          {
            path: PageRoutes.forgotDomainSuccess,
            element: <ForgotDomainSuccess />,
          },
        ],
      },

      {
        path: PageRoutes.signup,
        children: [
          { index: true, element: <SignUp /> },
          { path: PageRoutes.signupSuccess, element: <SignupSuccess /> },
          { path: PageRoutes.signupFailure, element: <SignupFailure /> },
          {
            path: PageRoutes.companyOnboarding,
            element: <CompanyOnboarding />,
          },
        ],
      },

      { path: PageRoutes.notFound, element: <ErrorPage /> },
    ],
  },
];

export default routes;
