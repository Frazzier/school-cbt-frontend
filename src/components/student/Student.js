import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ucwords } from "../../hooks/string-helper";

const Student = (props) => {
  const { student } = props;
  const MySwal = withReactContent(Swal);
  const changePermissionHandler = (student) => {
    MySwal.fire({
      title: <p>Apakah anda yakin ?</p>,
      html: (
        <p>
          {student.test_permission === "prohibited"
            ? "Siswa akan diizinkan mengikuti test !"
            : "Siswa akan dilarang mengikuti test !"}
        </p>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Ya !",
      cancelButtonText: "Tidak !",
      icon: "warning",
    }).then((value) => {
      if (value.isConfirmed) {
        props.changePermissionHandler(student.id);
      }
    });
  };

  return (
    <div className="col-12" key={student.id}>
      <div
        className={`card border ${
          student.test_permission === "prohibited"
            ? "border-danger"
            : "border-primary"
        }`}
      >
        <div className="card-body text-primary row">
          <div className="col-12 col-lg-3 text-center">
            <img
              src={student.user.profile_picture_url}
              className="rounded-circle avatar-md img-thumbnail mb-2"
              alt="profile"
            />
          </div>
          <div className="col-12 col-md-7 col-lg-6">
            <h4 className="card-title text-primary">
              {ucwords(student.user.name)} ({student.user.email})
            </h4>
            <p
              className={
                student.test_permission === "prohibited"
                  ? "text-danger"
                  : "text-primary"
              }
            >
              Izin Mengerjakan :{" "}
              {student.test_permission === "prohibited"
                ? "Tidak Diizinkan"
                : "Diizinkan"}
            </p>
          </div>
          <div
            className="col-12 col-md-5 col-lg-3 align-self-center text-center"
            onClick={() => {
              changePermissionHandler(student);
            }}
          >
            <button
              className={`btn btn-sm ${
                student.test_permission === "prohibited"
                  ? "btn-success"
                  : "btn-danger"
              }`}
            >
              <i
                className={`mdi ${
                  student.test_permission === "prohibited"
                    ? "mdi-check"
                    : "mdi-block-helper"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
