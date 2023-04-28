import React from "react";
// import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import Faq from "./pages/Faq";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
// import SignUp from "./pages/Signup";
// import Pricing from "./pages/Pricing";
// import Contact from "./pages/Contact";
import Templates from "./pages/Templates";
// import Book from "./pages/Resources/Book/Book";
import ScrollToTop from "./components/ScrollToTop";
// import Resources from "./pages/Resources/Resources";
// import ForgotPassword from "./pages/ForgotPassword";
// import VerifyPassword from "./pages/VerifyPassword";
// import Article from "./pages/Resources/Article/Article";
// import CompanyOnBoarding from "./pages/CompanyOnBoarding";
// import Resource from "./pages/Resources/resource/resource";
import FeaturedProgram from "./layouts/Home/FeaturedProgram";
import TemplateFeature from "./layouts/Templates/templateFeature";
import TemplateCategory from "./layouts/Templates/templateCategory";
import ProtectedRoute from "./components/ProtectedRoute";
// import adminProtectedRoutes from "./routes/admin-routes/admin-routes";
// import AdminDashboardLayout from "./pages/AdminDashboard/admin-dashboard-layout";

// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import CoursePage from "./layouts/EmployeeDashboard/CoursePage";
// import EmployeeCourses from "./layouts/EmployeeDashboard/EmployeeCourses";
// import EditEmployeeProfile from "./layouts/EmployeeDashboard/EditEmployeeProfile";

// import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUserDetails } from "./redux/actions/usersAction";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessJoinList from "./pages/SuccessJoinList";

function App() {
  const { userInfo, userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const storeToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

  const storeDetails = localStorage.getItem("userDetails")
    ? localStorage.getItem("userDetails")
    : null;

  // automatically authenticate user if token is found
  React.useEffect(() => {
    const handleTabClose = () => {
      localStorage.clear();
    };

    if (
      userToken === null ||
      userToken === "undefined" ||
      JSON.stringify(storeDetails) === null
    ) {
      localStorage.clear();
    }

    if (userToken || storeToken) {
      dispatch(getUserDetails());
    }
  }, [storeToken, storeDetails]);

  return (
    <>
      {/* <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      > */}
      <ToastContainer />
      <Router>
        <ScrollToTop>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home userToken={storeToken} />} />

            {/* <Route path="faq" element={<Faq />} /> */}

            {/* TODO: move to protected route */}
            {/* <Route path='test' element={<CompanyOnBoarding />} /> */}

            {/* <Route path="signup" element={<SignUp />} /> */}
            <Route path="join-the-waitlist" element={<SignIn />} />
            <Route path="success-waitlist" element={<SuccessJoinList />} />
            {/* <Route path="reset-password" element={<ForgotPassword />} /> */}
            {/* <Route path="verify/:token" element={<VerifyPassword />} />
              <Route path="contact" element={<Contact />} />
              <Route path="pricing" element={<Pricing />} /> */}

            <Route path="templates" element={<Templates />} />
            <Route path="templates/:id" element={<TemplateFeature />} />
            <Route
              path="templates/category/:id"
              element={<TemplateCategory />}
            />
            <Route path="programs/:id" element={<FeaturedProgram />} />
            {/* <Route path="/resource" element={<Resources />}> */}
            {/* <Route path="" element={<Resource />} />
                <Route path="book/:id" element={<Book />} />
                <Route path="article/:id" element={<Article />} />
              </Route> */}

            <Route
              path="/dashboard"
              element={
                <RequireAdminAuth userToken={storeToken} user={storeDetails}>
                  {/* <AdminDashboardLayout /> */}
                </RequireAdminAuth>
              }
            >
              {/* {adminProtectedRoutes.map((route, i) => {
                  return (
                    <Route
                      key={i}
                      path={route.path}
                      element={<route.element />}
                    >
                      {route?.children && (
                        <>
                          {route.children.map((child, i) => (
                            <Route
                              key={i}
                              path={child.path}
                              element={<child.element />}
                            />
                          ))}
                        </>
                      )}
                    </Route>
                  ); */}
              {/* })} */}
            </Route>

            <Route element={<ProtectedRoute />}>
              {/* <Route
                  path="company-onboarding"
                  element={<CompanyOnBoarding />}
                /> */}

              {/* <Route
                  path="/employeeDashboard"
                  element={<EmployeeDashboard />}
                >
                  <Route path="courses" element={<EmployeeCourses />} />
                </Route>
                <Route
                  path="edit-employeeProfile"
                  element={<EditEmployeeProfile />} */}
              {/* /> */}

              {/* <Route path="coursePage" element={<CoursePage />} /> */}
            </Route>
          </Routes>
        </ScrollToTop>
      </Router>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;

function RequireAdminAuth({ children, userToken, user }: any) {
  let isAdmin = JSON.parse(user)?.user?.isAdmin;

  if (!isAdmin || !userToken) {
    return <Navigate to="/join-the-waitlist" replace />;
  }

  return children;
}
