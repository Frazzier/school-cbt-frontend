import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DepartmentCard = (props) => {
  const { editHandler } = props;
  const MySwal = withReactContent(Swal);
  const { department } = props;

  const deleteHandler = (department_id) => {
    MySwal.fire({
      title: <p>Hapus Jurusan ?</p>,
      html: <p>Kelas dan murid yang ada di jurusan akan ikut dihapus !</p>,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Ya !",
      cancelButtonText: "Tidak !",
      icon: "warning",
    }).then((value) => {
      if (value.isConfirmed) {
        props.deleteHandler(department_id);
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
              {department.name} ({department.abbreviation})
            </h4>
            <p>Jumlah Kelas : {department.class_count}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 align-self-center text-center">
            <button
              className="btn btn-success btn-sm m-1"
              onClick={() => {
                editHandler(department);
              }}
            >
              <i className="mdi mdi-square-edit-outline"></i>
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                deleteHandler(department.id);
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

export default DepartmentCard;
