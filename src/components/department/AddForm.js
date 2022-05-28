import { Fragment, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const AddForm = (props) => {
  const { setDepartments } = props;
  const nameRef = useRef();
  const abbreviationRef = useRef();
  const { loading, sendRequest: addDepartmentRequest } = useHttp();

  const addDepartmentHandler = (event) => {
    event.preventDefault();

    addDepartmentRequest(
      {
        method: "POST",
        url: "/department",
        data: {
          name: nameRef.current.value,
          abbreviation: abbreviationRef.current.value,
        },
      },
      (response) => {
        setDepartments((oldDepartments) => [
          ...oldDepartments,
          response.department,
        ]);
        nameRef.current.value = "";
        abbreviationRef.current.value = "";
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
            <form onSubmit={addDepartmentHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Tambah Jurusan</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <input
                    type="text"
                    className="form-group form-control form-control-sm"
                    placeholder="Nama Jurusan"
                    ref={nameRef}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-5">
                  <input
                    type="text"
                    className="form-group form-control form-control-sm"
                    placeholder="Singkatan"
                    ref={abbreviationRef}
                  />
                </div>
                <div className="col-12 col-md-2">
                  <div
                    className="form-group text-center"
                    style={{ display: "flex" }}
                  >
                    {!loading && (
                      <button className="btn btn-sm btn-primary btn-block">
                        Tambah Jurusan
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
        </div>
      </div>
    </Fragment>
  );
};

export default AddForm;
