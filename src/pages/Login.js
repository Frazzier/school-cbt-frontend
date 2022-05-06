import { useRef, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { toast } from "react-toastify";

import AuthContext from "../store/auth-context";
import SettingContext from "../store/setting-context";
import useHttp from "../hooks/use-http";

const Login = () => {
  const settingCtx = useContext(SettingContext);
  const authCtx = useContext(AuthContext);
  const authRef = useRef(authCtx);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { loading, sendRequest: loginRequest } = useHttp();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    loginRequest(
      {
        method: "POST",
        url: "/login",
        data: {
          email: enteredEmail,
          password: enteredPassword,
        },
      },
      (response) => {
        authRef.current.login(response.token, response.user);
        toast.success(response.message);
      }
    );
  };

  return (
    <Fragment>
      <title>Login</title>
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="text-center">
                <Link to="/" className="logo">
                  <img
                    src={settingCtx.logo}
                    alt=""
                    height={30}
                    className="logo-light mx-auto"
                  />
                  <img
                    src={settingCtx.logo}
                    alt=""
                    height={30}
                    className="logo-dark mx-auto"
                  />
                </Link>
                <p className="text-muted mt-2 mb-4"></p>
              </div>
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">Sign In</h4>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="form-group mb-3">
                      <label htmlFor="emailaddress">Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        id="emailaddress"
                        required
                        placeholder="Enter your email"
                        ref={emailInputRef}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        required
                        id="password"
                        placeholder="Enter your password"
                        ref={passwordInputRef}
                        autoComplete="off"
                      />
                    </div>
                    <div
                      className="form-group mb-0 text-center"
                      style={{ display: "flex" }}
                    >
                      {!loading && (
                        <button className="btn btn-primary btn-block">
                          Log In
                        </button>
                      )}
                      <BarLoader
                        color="aqua"
                        loading={loading}
                        height={4}
                        width="100%"
                      />
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="row mt-3">
              <div className="col-12 text-center">
                <p>
                  <Link to="/forgot-password" className="text-muted ml-1">
                    <i className="fa fa-lock mr-1" />
                    Forgot your password?
                  </Link>
                </p>
                <p className="text-muted">
                  Don't have an account?
                  <Link to="/register" className="text-dark ml-1">
                    <b>Sign Up</b>
                  </Link>
                </p>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
