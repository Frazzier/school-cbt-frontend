import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BarLoader } from "react-spinners";
import useHttp from "../../hooks/use-http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardSkeleton from "./CardSkeleton";
import ClassCard from "./ClassCard";

const List = (props) => {
  const {
    fetchClassesLoading,
    classes,
    setClasses,
    editHandler,
    fetchMoreClasses,
    hasMore,
  } = props;
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
      {fetchClassesLoading && classes.length === 0 && (
        <Fragment>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Fragment>
      )}
      {classes.length > 0 && (
        <div className="col-12">
          <InfiniteScroll
            style={{ overflow: "none" }}
            dataLength={classes.length}
            next={fetchMoreClasses}
            hasMore={hasMore}
            loader={
              <div className="row mt-2 mb-4">
                <BarLoader
                  color="aqua"
                  loading={fetchClassesLoading}
                  height={4}
                  width="100%"
                />
              </div>
            }
            endMessage={
              classes.length > 10 && (
                <p style={{ textAlign: "center", margin: "40px 0px" }}>
                  <b>No More Data !</b>
                </p>
              )
            }
          >
            <div className="row">
              {classes.map((class_) => {
                return (
                  <ClassCard
                    class_={class_}
                    deleteHandler={deleteHandler}
                    key={class_.id}
                    editHandler={editHandler}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      )}
      {!fetchClassesLoading && classes.length === 0 && (
        <h4 className="mx-auto mt-3">{"Tidak ada data kelas !"}</h4>
      )}
    </Fragment>
  );
};

export default List;
