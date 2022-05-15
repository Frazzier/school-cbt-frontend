import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <Fragment>
      <li>
        <NavLink to="/department" activeClassName="active">
          <i className="mdi mdi-office-building" />
          <span> Jurusan </span>
        </NavLink>
      </li>
      <li className="menu-title">Pengaturan</li>
      <li>
        <NavLink to="/setting" activeClassName="active">
          <i className="mdi mdi-cog" />
          <span> Pengaturan Aplikasi </span>
        </NavLink>
      </li>
    </Fragment>
  );
};

export default Admin;
