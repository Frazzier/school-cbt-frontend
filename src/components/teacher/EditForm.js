import { Fragment, useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const AddForm = (props) => {
  const { editTeacher, teachers, setTeachers, setFormType } = props;
  const nameRef = useRef();
  const emailRef = useRef();
  const { loading, sendRequest: editTeacherRequest } = useHttp();

  useEffect(() => {
    nameRef.current.value = editTeacher.user.name;
    emailRef.current.value = editTeacher.user.email;
  }, [editTeacher]);

  const editTeacherHandler = (event) => {
    event.preventDefault();

    editTeacherRequest(
      {
        method: "PATCH",
        url: `/teacher/${editTeacher.id}`,
        data: {
          name: nameRef.current.value,
          email: emailRef.current.value,
        },
      },
      (response) => {
        setTeachers(
          teachers.filter((state) => {
            if (state.id !== editTeacher.id) {
              return state;
            } else {
              state.user.name = response.teacher.user.name;
              state.user.email = response.teacher.user.email;
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
            <form onSubmit={editTeacherHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Edit Guru</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama"
                    ref={nameRef}
                    defaultValue={editTeacher.user.name}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-5">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="Email"
                    ref={emailRef}
                    defaultValue={editTeacher.user.email}
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
