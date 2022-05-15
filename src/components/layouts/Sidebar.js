import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import Admin from "./sidebar/Admin";
import Teacher from "./sidebar/Teacher";
import Student from "./sidebar/Student";

const Sidebar = () => {
  const authCtx = useRef(useContext(AuthContext));

  return (
    <div className="left-side-menu pt-0">
      <div className="slimscroll-menu">
        <div id="sidebar-menu">
          <ul className="metismenu" id="side-menu">
            <li className="menu-title">Main</li>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                <i className="mdi mdi-view-dashboard" />
                <span> Dashboard </span>
              </NavLink>
            </li>
            {authCtx.current.user.role === "admin" && <Admin></Admin>}
            {authCtx.current.user.role === "teacher" && <Teacher></Teacher>}
            {authCtx.current.user.role === "student" && <Student></Student>}
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default Sidebar;
