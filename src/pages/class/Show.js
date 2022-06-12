import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import useHttp from "../../hooks/use-http";
import List from "../../components/student/List";
import { toast } from "react-toastify";

const Show = () => {
  const { class_id } = useParams();
  const [class_, setClass] = useState();
  const [students, setStudents] = useState([]);
  const { loading: fetchClassLoading, sendRequest: fetchClassRequest } =
    useHttp();
  const { loading: fetchStudenstLoading, sendRequest: fetchStudentsRequest } =
    useHttp();
  const { sendRequest: changeTestPermissionRequest } = useHttp();
  useEffect(() => {
    fetchClassRequest(
      {
        method: "GET",
        url: `/class/${class_id}`,
      },
      (response) => {
        setClass(response.class);
      }
    );

    fetchStudentsRequest(
      {
        method: "GET",
        url: `/student`,
        params: {
          class: class_id,
          limit: -1,
        },
      },
      (response) => {
        setStudents(response.students.data);
      }
    );
  }, [fetchClassRequest, class_id, fetchStudentsRequest]);

  const changeTestPermissionHandler = (student_id) => {
    changeTestPermissionRequest(
      {
        method: "POST",
        url: `/student/test-permission/${student_id}`,
      },
      (response) => {
        setStudents((prevState) => {
          prevState.filter((student) => {
            if (student.id === student_id) {
              student.test_permission = response.student.test_permission;
            }
            return student;
          });
          return prevState;
        });
        toast.success(response.message);
      }
    );
  };
  return (
    <Layout
      title={
        class_ ? (
          class_.degree.toUpperCase() +
          " " +
          class_.department.abbreviation +
          " " +
          class_.name.toUpperCase()
        ) : (
          <Skeleton />
        )
      }
    >
      <div className="row">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="card-box">
            <h4>
              {class_ ? (
                `Kelas
                ${class_.degree.toUpperCase()} ${
                  class_.department.abbreviation
                } ${class_.name.toUpperCase()}`
              ) : (
                <Skeleton />
              )}
            </h4>
            <p>
              {class_ ? "Jumlah Siswa : " + class_.student_count : <Skeleton />}
            </p>
          </div>
          {!fetchClassLoading && class_ && (
            <div className="text-center card-box">
              <h4>Wali Kelas</h4>
              <img
                src={class_.homeroom_teacher.user.profile_picture_url}
                className="rounded-circle avatar-xl img-thumbnail mb-2"
                alt="profile"
              />
              <div className="text-left">
                <p className="text-muted font-13">
                  <strong>Nama :</strong>
                  <span className="ml-2">
                    {class_.homeroom_teacher.user.name}
                  </span>
                </p>
                <p className="text-muted font-13">
                  <strong>Email :</strong>
                  <span className="ml-2">
                    {class_.homeroom_teacher.user.email}
                  </span>
                </p>
              </div>
            </div>
          )}
          {fetchClassLoading && (
            <div className="text-center card-box">
              <h4>Wali Kelas</h4>
              <div
                className="mx-auto mb-2"
                style={{ width: "6rem", height: "6rem" }}
              >
                <Skeleton circle={true} height={"100%"} />
              </div>
              <Skeleton count={2} />
            </div>
          )}
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          <div className="card-box">
            <h4>Siswa </h4>
          </div>
          <List
            fetchClassLoading={fetchClassLoading}
            fetchStudenstLoading={fetchStudenstLoading}
            students={students}
            changePermissionHandler={changeTestPermissionHandler}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Show;
