import Account from "../../pages/AdminDashboard/company/Account";
import EditAdminProfile from "../../pages/AdminDashboard/company/edit-admin-profile/EditAdminProfile";
import Profile from "../../pages/AdminDashboard/company/profile/Profile";
import CourseDetail from "../../pages/AdminDashboard/learning/course-detail/course-detail";
import CourseListPage from "../../pages/AdminDashboard/learning/courselist-page/courselist-page";
import Learning from "../../pages/AdminDashboard/learning/learning";
import Overview from "../../pages/AdminDashboard/overview/overview";
import FiresideChats from "../../pages/AdminDashboard/templates/fireside-chats/fireside-chats";
import Peer from "../../pages/AdminDashboard/templates/peer/peer";
import ShoutOuts from "../../pages/AdminDashboard/templates/shout-outs/shout-outs";
import ComplaintsSuggestion from "../../pages/AdminDashboard/templates/suggestion-box/suggestion-box";
import TeamSumUp from "../../pages/AdminDashboard/templates/team-sumup/team-sumup";
import TemplateList from "../../pages/AdminDashboard/templates/template-list/template-list";
import DashboardTemplates from "../../pages/AdminDashboard/templates/templates";

export const adminProtectedRoutes = [
  {
    title: "Overview",
    path: "overview",
    element: Overview,
  },

  {
    title: "Learning",
    path: "learning",
    element: Learning,
    children: [
      {
        title: "CourseListPage",
        path: "",
        element: CourseListPage,
      },
      {
        title: "CourseDetail",
        path: ":id",
        element: CourseDetail,
      },
    ],
  },

  {
    title: "Templates",
    path: "templates",
    element: DashboardTemplates,
    children: [
      {
        title: "TemplateList",
        path: "",
        element: TemplateList,
      },
      {
        title: "Team Sum up",
        path: "team-sum-up",
        element: TeamSumUp,
      },
      {
        title: "Peer",
        path: "peer",
        element: Peer,
      },
      {
        title: "Fireside Chats",
        path: "fireside-chats",
        element: FiresideChats,
      },
      {
        title: "Complaints",
        path: "complaints-suggestion",
        element: ComplaintsSuggestion,
      },
      {
        title: "Shout Outs",
        path: "shout-outs",
        element: ShoutOuts,
      },
    ],
  },
  {
    title: "Account",
    path: "account",
    element: Account,
    children: [
      {
        title: "Profile",
        path: "",
        element: Profile,
      },
      {
        title: "EditAdminProfile",
        path: "editProfile",
        element: EditAdminProfile,
      },
    ],
  },
];

export default adminProtectedRoutes;
