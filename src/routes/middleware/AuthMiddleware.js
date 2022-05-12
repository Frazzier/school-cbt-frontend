import { Route, Redirect } from "react-router-dom";

const AuthMiddleware = ({
  component: Component,
  auth,
  roles,
  role,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          !roles || roles.includes(role) ? (
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
