import { Fragment, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const AddForm = (props) => {
  const { setTeachers } = props;
  const nameRef = useRef();
  const emailRef = useRef();
  const { loading, sendRequest: addTeacherRequest } = useHttp();

  const addTeacherHandler = (event) => {
    event.preventDefault();

    addTeacherRequest(
      {
        method: "POST",
        url: "/teacher",
        data: {
          name: nameRef.current.value,
          email: emailRef.current.value,
        },
      },
      (response) => {
        setTeachers((oldTeachers) => [...oldTeachers, response.teacher]);
        nameRef.current.value = "";
        emailRef.current.value = "";
        toast.success(response.message);
      }
    );
  };

  return (
    <Fragment>
      <div className="col-12 my-2">
        <div
          className="card border-primary"
          style={{ borderLeft: "15px solid", borderRadius: "10px" }}
        >
          <div className="card-body">
            <form onSubmit={addTeacherHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Tambah Guru</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama"
                    ref={nameRef}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-5">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </div>
                <div className="col-12 col-md-2">
                  <div
                    className="form-group text-center"
                    style={{ display: "flex" }}
                  >
                    {!loading && (
                      <button className="btn btn-sm btn-primary btn-block">
                        Tambah Guru
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
                <p className="text-muted">
                  <span className="text-danger">*)</span> Password default akun
                  adalah `password`
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddForm;
