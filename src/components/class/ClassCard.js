import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ClassCard = (props) => {
  const { editHandler } = props;
  const MySwal = withReactContent(Swal);
  const { class_ } = props;

  const deleteHandler = (class_id) => {
    MySwal.fire({
      title: <p>Hapus Kelas ?</p>,
      html: <p>Siswa yang ada di kelas akan ikut dihapus !</p>,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Ya !",
      cancelButtonText: "Tidak !",
      icon: "warning",
    }).then((value) => {
      if (value.isConfirmed) {
        props.deleteHandler(class_id);
      }
    });
  };

  return (
    <div className="col-12 col-lg-6">
      <div
        className="card border-primary mb-1"
        style={{ borderLeft: "15px solid", borderRadius: "10px" }}
      >
        <div className="card-body text-primary row">
          <div className="col-12 col-md-6 col-lg-8">
            <h4 className="card-title text-primary">
              {class_.degree.toUpperCase()}{" "}
              {class_.department.abbreviation.toUpperCase()} {class_.name}
            </h4>
            <p>
              Wali Kelas :{" "}
              {class_.homeroom_teacher
                ? class_.homeroom_teacher.user.name
                : "Tidak ada data wali kelas !"}
            </p>
            <p>Jumlah Siswa : {class_.student_count}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 align-self-center text-center">
            <Link
              to={`/class/${class_.id}`}
              className="btn btn-info btn-sm m-1"
            >
              <i className="mdi mdi-information-outline" />
            </Link>
            <button
              className="btn btn-success btn-sm m-1"
              onClick={() => {
                editHandler(class_);
              }}
            >
              <i className="mdi mdi-square-edit-outline"></i>
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                deleteHandler(class_.id);
              }}
            >
              <i className="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
