import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SettingContext from "../../store/setting-context";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";

const Topbar = (props) => {
  const authCtx = useContext(AuthContext);
  const authRef = useRef(authCtx);
  const settingCtx = useContext(SettingContext);
  const { sendRequest: logoutRequest } = useHttp();
  const [logoutResponse, setLogoutResponse] = useState();

  useEffect(() => {
    if (logoutResponse) {
      authRef.current.logout();
      toast.success(logoutResponse.message);
    }
  }, [logoutResponse]);

  const logoutHandler = () => {
    logoutRequest(
      {
        method: "POST",
        url: "/logout",
      },
      setLogoutResponse
    );
  };

  return (
    <div className="navbar-custom">
      <ul className="list-unstyled topnav-menu float-right mb-0">
        <li className="dropdown notification-list">
          <a
            className="nav-link dropdown-toggle nav-user mr-0 waves-effect"
            data-toggle="dropdown"
            href="#!"
            role="button"
            aria-haspopup="false"
            aria-expanded="false"
          >
            <img
              alt="profile-pic"
              src={
                authCtx.user.avatar_url ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
              }
              className="rounded-circle"
            />
            <span className="pro-user-name ml-1">
              {authCtx.user.name.charAt(0).toUpperCase() +
                authCtx.user.name.slice(1)}
              <i className="mdi mdi-chevron-down" />
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
            <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div>
            <Link to="/profile" className="dropdown-item notify-item">
              <i className="fe-user" />
              <span>Profil</span>
            </Link>
            <div className="dropdown-divider" />
            <a
              href="#!"
              className="dropdown-item notify-item"
              onClick={logoutHandler}
            >
              <i className="fe-log-out" />
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
      <div className="logo-box">
        <a href="/" className="logo logo-dark text-center">
          <span className="logo-lg">
            <img src={settingCtx.logo} alt="" height={50} />
          </span>
          <span className="logo-sm">
            <img src={settingCtx.logo} alt="" width={50} />
          </span>
        </a>
        <a href="/" className="logo logo-light text-center">
          <span className="logo-lg">
            <img src={settingCtx.logo} alt="" height={50} />
          </span>
          <span className="logo-sm">
            <img src={settingCtx.logo} alt="" width={50} />
          </span>
        </a>
      </div>
      <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
        <li>
          <button className="button-menu-mobile disable-btn waves-effect">
            <i className="fe-menu" />
          </button>
        </li>
        <li>
          <h4 className="page-title-main">{props.title}</h4>
          <title>{props.title}</title>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
