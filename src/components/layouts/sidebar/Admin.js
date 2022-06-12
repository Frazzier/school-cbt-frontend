import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <Fragment>
      <li className="menu-title">Master Data</li>
      <li>
        <NavLink to="/department" activeClassName="active">
          <i className="mdi mdi-office-building" />
          <span> Jurusan </span>
        </NavLink>
        <NavLink to="/teacher" activeClassName="active">
          <i className="mdi mdi-account-multiple" />
          <span> Guru </span>
        </NavLink>
        <NavLink to="/class" activeClassName="active">
          <i className="mdi mdi-home-variant-outline" />
          <span> Kelas </span>
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
