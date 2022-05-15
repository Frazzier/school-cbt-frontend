import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const AuthMiddleware = ({
  component: Component,
  auth,
  roles,
  role,
  ...rest
}) => {
  const authCtx = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authCtx.isLoggedIn ? (
          !roles || roles.includes(authCtx.user.role) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/not-found", state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthMiddleware;
