import { Fragment, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import useHttp from "../../hooks/use-http";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

const AddForm = (props) => {
  const {
    departments,
    teachers,
    fetchDepartmentsLoading,
    fetchTeachersLoading,
    editClass,
    classes,
    setClasses,
    setFormType,
  } = props;
  const nameRef = useRef();
  const degreeRef = useRef();
  const departmentIdRef = useRef();
  const homeroomTeacherIdRef = useRef();
  const { loading, sendRequest: editClassRequest } = useHttp();

  useEffect(() => {
    nameRef.current.value = editClass.name;
    degreeRef.current.value = editClass.degree.toUpperCase();
  }, [editClass]);

  const editClassHandler = (event) => {
    event.preventDefault();

    editClassRequest(
      {
        method: "PATCH",
        url: `/class/${editClass.id}`,
        data: {
          name: nameRef.current.value,
          degree: degreeRef.current.value.toLowerCase(),
          department_id: departmentIdRef.current.value,
          homeroom_teacher_id: homeroomTeacherIdRef.current.value,
        },
      },
      (response) => {
        setClasses(
          classes.filter((state) => {
            if (state.id !== editClass.id) {
              return state;
            } else {
              state.name = response.class.name;
              state.degree = response.class.degree;
              state.department_id = response.class.department_id;
              state.department = response.class.department;
              state.homeroom_teacher_id = response.class.homeroom_teacher_id;
              state.homeroom_teacher = response.class.homeroom_teacher;
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
            <form onSubmit={editClassHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Edit Kelas</h4>
                </div>

                <div className="col-12 col-md-10">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      {fetchDepartmentsLoading && <Skeleton />}
                      {!fetchDepartmentsLoading && (
                        <div className="form-group">
                          <select
                            ref={departmentIdRef}
                            className="form-control form-control-sm"
                            defaultValue={editClass.department_id}
                          >
                            <option disabled>Pilih Jurusan</option>
                            {departments.length > 0 &&
                              departments.map((department) => {
                                return (
                                  <option
                                    value={department.id}
                                    key={department.id}
                                  >
                                    {department.name.toUpperCase()}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-6">
                      {fetchTeachersLoading && <Skeleton />}
                      {!fetchTeachersLoading && (
                        <div className="form-group">
                          <select
                            ref={homeroomTeacherIdRef}
                            className="form-control form-control-sm"
                            defaultValue={
                              editClass.homeroom_teacher_id ||
                              "Pilih Wali Kelas"
                            }
                          >
                            <option disabled>Pilih Wali Kelas</option>
                            {teachers.length > 0 &&
                              teachers.map((teacher) => {
                                return (
                                  <option value={teacher.id} key={teacher.id}>
                                    {teacher.user.name.toUpperCase()}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-group form-control form-control-sm"
                        placeholder="Tingkat Kelas"
                        ref={degreeRef}
                        defaultValue={editClass.degree}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-group form-control form-control-sm"
                        placeholder="Nama Kelas"
                        ref={nameRef}
                        defaultValue={editClass.name}
                      />
                    </div>
                  </div>
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
