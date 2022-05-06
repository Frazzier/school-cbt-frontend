import { Route, Redirect } from "react-router-dom";

const AuthMiddleware = ({ component: Component, auth, guestOnly, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        guestOnly !== true || (guestOnly === true && auth !== true) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthMiddleware;
