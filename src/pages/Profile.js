import { useContext, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";

import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

import Layout from "../components/layouts/Layout";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [fileName, setFileName] = useState("Choose file...");
  const nameInputRef = useRef(authCtx.user.name);
  const emailInputRef = useRef(authCtx.user.email);
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();
  const { loading: updateProfileLoading, sendRequest: updateProfileRequest } =
    useHttp();
  const { loading: changePasswordLoading, sendRequest: changePasswordRequest } =
    useHttp();

  const fileChangeHandler = (event) => {
    if (event.target.files.length === 1) {
      setFileName(event.target.files[0].name);
    }
  };

  const submitUpdateProfileHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const profilePicture =
      document.querySelector('input[type="file"]').files[0];

    const data = new FormData();
    data.append("name", enteredName);
    data.append("email", enteredEmail);
    if (profilePicture) {
      data.append("profile_picture", profilePicture);
    }

    updateProfileRequest(
      {
        method: "POST",
        url: "/profile?_method=PATCH",
        headers: { "content-type": "multipart/form-data" },
        data: data,
      },
      (response) => {
        authCtx.updateProfile(response.user);
        toast.success(response.message);
      }
    );
  };

  const submitChangePasswordHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirmation =
      passwordConfirmationInputRef.current.value;

    changePasswordRequest(
      {
        method: "PATCH",
        url: "/change-password",
        data: {
          password: enteredPassword,
          password_confirmation: enteredPasswordConfirmation,
        },
      },
      (response) => {
        toast.success(response.message);
        passwordInputRef.current.value = "";
        passwordConfirmationInputRef.current.value = "";
      }
    );
  };

  return (
    <Layout title="Profil">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card card-body">
            <div className="row">
              <div className="col-12 col-lg-4 text-center">
                <img
                  src={
                    authCtx.user.profile_picture_url ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                  }
                  className="rounded-circle avatar-xxxl img-thumbnail mt-3"
                  alt="avatar"
                />
              </div>
              <div className="col-12 col-lg-8">
                <form
                  className="form-horizontal"
                  onSubmit={submitUpdateProfileHandler}
                >
                  <h4 className="mt-0 mb-3 header-title">Ganti Profil</h4>

                  <div className="form-group">
                    <label>Foto</label>
                    <div className="custom-file mb-1">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="profile_picture"
                        onChange={fileChangeHandler}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="profile_picture"
                      >
                        {fileName}
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="text-danger">*)</span> Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Masukan Nama"
                      defaultValue={authCtx.user.name}
                      ref={nameInputRef}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="text-danger">*)</span> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Masukan email"
                      defaultValue={authCtx.user.email}
                      ref={emailInputRef}
                    />
                  </div>

                  <div className="row">
                    {!updateProfileLoading && (
                      <button className="btn btn-sm btn-primary waves-effect waves-light ml-auto mr-2">
                        Update Profil
                      </button>
                    )}
                    <BarLoader
                      color="aqua"
                      loading={updateProfileLoading}
                      height={4}
                      width="100%"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card card-body">
            <form
              className="form-horizontal"
              onSubmit={submitChangePasswordHandler}
            >
              <h4 className="mt-0 mb-3 header-title">Ganti Password</h4>

              <div className="form-group">
                <label htmlFor="password">Password Baru</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Masukan Password Baru"
                  ref={passwordInputRef}
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="form-control"
                  placeholder="Masukan Password Baru"
                  ref={passwordConfirmationInputRef}
                  autoComplete="new-password"
                />
              </div>

              <div className="row">
                {!changePasswordLoading && (
                  <button className="btn btn-sm btn-primary waves-effect waves-light ml-auto mr-2">
                    Ubah Password
                  </button>
                )}
                <BarLoader
                  color="aqua"
                  loading={changePasswordLoading}
                  height={4}
                  width="100%"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
