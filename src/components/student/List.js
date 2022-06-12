import Skeleton from "react-loading-skeleton";
import Student from "./Student";

const List = (props) => {
  const { fetchClassLoading, fetchStudenstLoading, students } = props;

  return (
    <div className="row">
      {fetchStudenstLoading && (
        <div className="col-12">
          <div className="card border border-primary">
            <div className="card-body text-primary row">
              <div className="col-12 col-lg-3 text-center">
                <div
                  className="mx-auto mb-2"
                  style={{ width: "3.5rem", height: "3.5rem" }}
                >
                  <Skeleton circle={true} height={"100%"} />
                </div>
              </div>

              <div className="col-12 col-md-7 col-lg-6">
                <h4 className="card-title text-primary">
                  <Skeleton />
                </h4>
                <p>
                  <Skeleton />
                </p>
              </div>
              <div className="col-12 col-md-5 col-lg-3 align-self-center text-center">
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      )}
      {!fetchClassLoading &&
        students.length > 0 &&
        students.map((student) => (
          <Student
            student={student}
            key={student.id}
            changePermissionHandler={props.changePermissionHandler}
          />
        ))}
      {!fetchStudenstLoading && students.length === 0 && (
        <div className="col-12">
          <h5 className="text-center mt-3">Tidak ada data siswa !</h5>
        </div>
      )}
    </div>
  );
};

export default List;
