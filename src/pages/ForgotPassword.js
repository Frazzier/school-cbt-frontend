import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="account-pages mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="text-center">
              <Link to="/" className="logo">
                <img
                  src="assets/images/logo-light.png"
                  alt=""
                  height={22}
                  className="logo-light mx-auto"
                />
                <img
                  src="assets/images/logo-dark.png"
                  alt=""
                  height={22}
                  className="logo-dark mx-auto"
                />
              </Link>
              <p className="text-muted mt-2 mb-4"></p>
            </div>
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="text-uppercase mt-0 mb-3">Reset Password</h4>
                  <p className="text-muted mb-0 font-13">
                    Enter your email address and we'll send you an email with
                    instructions to reset your password.
                  </p>
                </div>
                <form action="#">
                  <div className="form-group mb-3">
                    <label htmlFor="emailaddress">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="emailaddress"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group mb-0 text-center">
                    <button className="btn btn-primary btn-block" type="submit">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <p className="text-muted">
                  Back to
                  <Link to="/login" className="text-dark ml-1">
                    <b>Log in</b>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
