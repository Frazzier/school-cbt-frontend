import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardSkeleton from "./CardSkeleton";
import ClassCard from "./ClassCard";

const List = (props) => {
  const { fetchClassesLoading, classes, setClasses, editHandler } = props;
  const MySwal = withReactContent(Swal);
  const { sendRequest: deleteClassRequest } = useHttp();
  const deleteHandler = (class_id) => {
    deleteClassRequest(
      {
        method: "DELETE",
        url: `/class/${class_id}`,
      },
      (response) => {
        setClasses(
          classes.filter((e) => {
            return e.id !== class_id;
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
      {fetchClassesLoading && (
        <Fragment>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Fragment>
      )}
      {classes.length > 0 &&
        classes.map((class_) => {
          return (
            <ClassCard
              class_={class_}
              deleteHandler={deleteHandler}
              key={class_.id}
              editHandler={editHandler}
            />
          );
        })}
      {!fetchClassesLoading && classes.length === 0 && (
        <h4 className="mx-auto mt-3">{"Tidak ada data kelas !"}</h4>
      )}
    </Fragment>
  );
};

export default List;
