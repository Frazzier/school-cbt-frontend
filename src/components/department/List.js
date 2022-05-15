import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardSkeleton from "./CardSkeleton";
import DepartmentCard from "./DepartmentCard";

const List = (props) => {
  const MySwal = withReactContent(Swal);
  const {
    loading: fetchDepartmentsLoading,
    sendRequest: fetchDepartmentsRequest,
  } = useHttp();
  const { sendRequest: deleteDepartmentRequest } = useHttp();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartmentsRequest(
      {
        method: "GET",
        url: "/department",
      },
      (response) => {
        setDepartments(response.departments);
      }
    );
  }, [fetchDepartmentsRequest]);

  const deleteHandler = (department_id) => {
    deleteDepartmentRequest(
      {
        method: "DELETE",
        url: `/department/${department_id}`,
      },
      (data) => {
        setDepartments(
          departments.filter((e) => {
            return e.id !== department_id;
          })
        );
        MySwal.fire({
          title: <p>Data berhasil dihapus !</p>,
          icon: "success",
        });
      }
    );
  };

  return (
    <Fragment>
      {fetchDepartmentsLoading && (
        <Fragment>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Fragment>
      )}
      {departments.length > 0 &&
        departments.map((department) => {
          return (
            <DepartmentCard
              department={department}
              deleteHandler={deleteHandler}
              key={department.id}
            />
          );
        })}
      {!fetchDepartmentsLoading && departments.length === 0 && (
        <h4 className="mx-auto mt-3">{"Tidak ada data jurusan !"}</h4>
      )}
    </Fragment>
  );
};

export default List;
