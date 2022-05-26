import { Fragment, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const AddForm = (props) => {
  const { editDepartment, departments, setDepartments, setFormType } = props;
  const nameRef = useRef();
  const abbreviationRef = useRef();
  const { loading, sendRequest: editDepartmentRequest } = useHttp();

  const editDepartmentHandler = (event) => {
    event.preventDefault();

    editDepartmentRequest(
      {
        method: "PATCH",
        url: `/department/${editDepartment.id}`,
        data: {
          name: nameRef.current.value,
          abbreviation: abbreviationRef.current.value,
        },
      },
      (response) => {
        setDepartments(
          departments.filter((state) => {
            if (state.id !== editDepartment.id) {
              return state;
            } else {
              state.name = response.department.name;
              state.abbreviation = response.department.abbreviation;
              return state;
            }
          })
        );

        setFormType("add");
        toast.success(response.message);
      }
    );
  };

  return (
    <Fragment>
      <div className="col-12 my-2">
        <div
          className="card border-success"
          style={{ borderLeft: "15px solid", borderRadius: "10px" }}
        >
          <div className="card-body">
            <form onSubmit={editDepartmentHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Edit Jurusan</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama Jurusan"
                    ref={nameRef}
                    defaultValue={editDepartment.name}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-5">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Singkatan"
                    ref={abbreviationRef}
                    defaultValue={editDepartment.abbreviation}
                  />
                </div>
                <div className="col-12 col-md-2">
                  <div
                    className="form-group text-center"
                    style={{ display: "flex" }}
                  >
                    {!loading && (
                      <button className="btn btn-sm btn-primary btn-block">
                        Simpan Perubahan
                      </button>
                    )}
                    <BarLoader
                      color="aqua"
                      loading={loading}
                      height={4}
                      width="100%"
                    />
                  </div>

                  <button
                    className="btn btn-sm btn-danger btn-block"
                    onClick={() => {
                      setFormType("add");
                    }}
                  >
                    Batal
                  </button>
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
