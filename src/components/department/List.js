import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardSkeleton from "./CardSkeleton";
import DepartmentCard from "./DepartmentCard";

const List = (props) => {
  const { fetchDepartmentsLoading, departments, setDepartments, editHandler } =
    props;
  const MySwal = withReactContent(Swal);
  const { sendRequest: deleteDepartmentRequest } = useHttp();
  const deleteHandler = (department_id) => {
    deleteDepartmentRequest(
      {
        method: "DELETE",
        url: `/department/${department_id}`,
      },
      (response) => {
        setDepartments(
          departments.filter((e) => {
            return e.id !== department_id;
          })
        );
        MySwal.fire({
          title: <p>{response.message}</p>,
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
              editHandler={editHandler}
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
