import React from "react";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Setting = React.lazy(() => import("../pages/Setting"));
const Profile = React.lazy(() => import("../pages/Profile"));

const AuthRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },
  { path: "/setting", component: Setting },
];

const GuestRoutes = [
  { path: "/login", component: Login, guestOnly: true },
  { path: "/register", component: Register, guestOnly: true },
  { path: "/forgot-password", component: ForgotPassword, guestOnly: true },
  { path: "/not-found", component: NotFound, guestOnly: false },
];

export { AuthRoutes, GuestRoutes };
