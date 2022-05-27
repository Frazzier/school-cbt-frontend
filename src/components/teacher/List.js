import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardSkeleton from "./CardSkeleton";
import TeacherCard from "./TeacherCard";

const List = (props) => {
  const { fetchTeachersLoading, teachers, setTeachers, editHandler } = props;
  const MySwal = withReactContent(Swal);
  const { sendRequest: deleteTeacherRequest } = useHttp();
  const deleteHandler = (teacher_id) => {
    deleteTeacherRequest(
      {
        method: "DELETE",
        url: `/teacher/${teacher_id}`,
      },
      (response) => {
        setTeachers(
          teachers.filter((e) => {
            return e.id !== teacher_id;
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
      {fetchTeachersLoading && (
        <Fragment>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Fragment>
      )}
      {teachers.length > 0 &&
        teachers.map((teacher) => {
          return (
            <TeacherCard
              teacher={teacher}
              deleteHandler={deleteHandler}
              key={teacher.id}
              editHandler={editHandler}
            />
          );
        })}
      {!fetchTeachersLoading && teachers.length === 0 && (
        <h4 className="mx-auto mt-3">{"Tidak ada data guru !"}</h4>
      )}
    </Fragment>
  );
};

export default List;
