import { useContext, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import Layout from "../components/layouts/Layout";
import SettingContext from "../store/setting-context";
import useHttp from "../hooks/use-http";

const Setting = () => {
  const settingCtx = useContext(SettingContext);
  const settingRef = useRef(settingCtx);
  const { loading, sendRequest } = useHttp();
  const [appName, setAppName] = useState(settingCtx.appName);
  const [fileName, setFileName] = useState("Choose file...");

  const fileChangeHandler = (event) => {
    if (event.target.files.length === 1) {
      setFileName(event.target.files[0].name);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const logo = document.querySelector('input[type="file"]').files[0];

    const data = new FormData();
    data.append("app_name", appName);
    if (logo) {
      data.append("logo", logo);
    }

    sendRequest(
      {
        method: "POST",
        url: "/setting?_method=PATCH",
        headers: { "content-type": "multipart/form-data" },
        data: data,
      },
      (response) => {
        document.getElementById("favicon").href = response.data.logo;
        settingRef.current.setSetting(response.data);
        toast.success("Pengaturan aplikasi berhasil diperbaharui !");
      }
    );
  };

  return (
    <Layout title="Pengaturan Aplikasi">
      <div className="card-box">
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label>Logo</label>
                <div className="w-100 text-center mb-3">
                  <img
                    src={
                      settingCtx.logo ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
                    }
                    className="img-thumbnail mt-3"
                    alt="logo"
                    style={{ maxHeight: "150px" }}
                  />
                </div>
                <div className="custom-file mb-1">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="logo"
                    onChange={fileChangeHandler}
                  />
                  <label className="custom-file-label" htmlFor="logo">
                    {fileName}
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="name">
                  <span className="text-danger">*)</span> Nama Aplikasi
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Masukan Nama"
                  defaultValue={settingCtx.appName}
                  onChange={(e) => {
                    setAppName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                {!loading && (
                  <button className="btn btn-sm btn-primary waves-effect waves-light ml-auto mr-2">
                    Update
                  </button>
                )}
                <BarLoader
                  color="aqua"
                  loading={loading}
                  height={4}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Setting;
