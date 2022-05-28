import { Fragment, useRef } from "react";
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
    setClasses,
  } = props;
  const nameRef = useRef();
  const degreeRef = useRef();
  const departmentIdRef = useRef();
  const homeroomTeacherIdRef = useRef();
  const { loading, sendRequest: addClassRequest } = useHttp();

  const addClassHandler = (event) => {
    event.preventDefault();

    addClassRequest(
      {
        method: "POST",
        url: "/class",
        data: {
          name: nameRef.current.value,
          degree: degreeRef.current.value.toLowerCase(),
          department_id: departmentIdRef.current.value,
          homeroom_teacher_id: homeroomTeacherIdRef.current.value,
        },
      },
      (response) => {
        setClasses((oldClasses) => [...oldClasses, response.class]);
        nameRef.current.value = "";
        degreeRef.current.value = "";
        departmentIdRef.current.value = "Pilih Jurusan";
        homeroomTeacherIdRef.current.value = "Pilih Wali Kelas";
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
            <form onSubmit={addClassHandler}>
              <div className="row">
                <div className="col-12">
                  <h4>Tambah Kelas</h4>
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
                            defaultValue="Pilih Jurusan"
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
                            defaultValue="Pilih Wali Kelas"
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
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-group form-control form-control-sm"
                        placeholder="Nama Kelas"
                        ref={nameRef}
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
                        Tambah Kelas
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
