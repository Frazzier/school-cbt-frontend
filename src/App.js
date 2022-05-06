import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  Suspense,
} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageLoading from "./components/layouts/PageLoading";
import AuthContext from "./store/auth-context";
import SettingContext from "./store/setting-context";
import useHttp from "./hooks/use-http";

import { AuthRoutes, GuestRoutes } from "./routes/allRoutes";
import AuthMiddleware from "./routes/middleware/AuthMiddleware";
import GuestMiddleware from "./routes/middleware/GuestMiddleware";

function App() {
  const authCtx = useContext(AuthContext);
  const settingCtx = useContext(SettingContext);
  const settingRef = useRef(settingCtx);

  const {
    loading: getSettingLoading,
    setLoading: setSettingLoading,
    sendRequest: getSettingRequest,
  } = useHttp();

  useEffect(() => {
    getSettingRequest(
      {
        method: "GET",
        url: "/setting",
      },
      (response) => {
        settingRef.current.setSetting(response.data);
        document.getElementById("favicon").href = response.data.logo;
        setSettingLoading(false);
      }
    );
  }, [getSettingRequest, setSettingLoading]);

  return (
    <Fragment>
      {getSettingLoading ? (
        <PageLoading />
      ) : (
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            {AuthRoutes.map(({ path, component, roles }, key) => (
              <AuthMiddleware
                auth={authCtx.isLoggedIn}
                roles={roles}
                exact
                path={path}
                component={component}
                key={key}
              />
            ))}

            {GuestRoutes.map(({ path, component, guestOnly }, key) => (
              <GuestMiddleware
                auth={authCtx.isLoggedIn}
                guestOnly={guestOnly}
                exact
                path={path}
                component={component}
                key={key}
              />
            ))}
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Suspense>
      )}
    </Fragment>
  );
}

export default App;
