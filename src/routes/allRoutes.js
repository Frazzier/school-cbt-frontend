import React from "react";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Setting = React.lazy(() => import("../pages/Setting"));
const Profile = React.lazy(() => import("../pages/Profile"));

const DepartmentIndex = React.lazy(() => import("../pages/department/Index"));
const TeacherIndex = React.lazy(() => import("../pages/teacher/Index"));
const ClassIndex = React.lazy(() => import("../pages/class/Index"));

const AuthRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: Profile },
  { path: "/setting", component: Setting, roles: ["admin"] },
  { path: "/department", component: DepartmentIndex, roles: ["admin"] },
  { path: "/teacher", component: TeacherIndex, roles: ["admin"] },
  { path: "/class", component: ClassIndex, roles: ["admin", "teacher"] },
];

const GuestRoutes = [
  { path: "/login", component: Login, guestOnly: true },
  { path: "/register", component: Register, guestOnly: true },
  { path: "/forgot-password", component: ForgotPassword, guestOnly: true },
  { path: "/not-found", component: NotFound, guestOnly: false },
];

export { AuthRoutes, GuestRoutes };
