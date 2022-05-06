import { useContext, useRef, Fragment } from "react";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";

import AuthContext from "../../store/auth-context";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import PageLoading from "../../components/layouts/PageLoading";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  const authRef = useRef(authCtx);
  const { loading: logoutLoading, sendRequest: logoutRequest } = useHttp();

  const logoutHandler = () => {
    logoutRequest(
      {
        method: "POST",
        url: "/logout",
      },
      (response) => {
        authRef.current.logout();
        toast.success(response.message);
      }
    );
  };

  return (
    <Fragment>
      {logoutLoading && <PageLoading />}
      {!logoutLoading && (
        <Fragment>
          <title>{props.title}</title>
          <Topbar title={props.title} logoutHandler={logoutHandler} />
          <Sidebar />
          <div className="content-page">
            <div className="content">
              <div className="container-fluid">{props.children}</div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Layout;
