import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
            <li className="menu-title">Pengaturan</li>
            <li>
              <NavLink to="/setting" activeClassName="active">
                <i className="mdi mdi-cog" />
                <span> Pengaturan Aplikasi </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default Sidebar;
