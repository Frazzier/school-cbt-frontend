import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import useHttp from "../../hooks/use-http";

const TeacherCard = (props) => {
  const { editHandler, teacher } = props;
  const MySwal = withReactContent(Swal);
  const { sendRequest: resetPasswordRequest } = useHttp();

  const deleteHandler = (teacher_id) => {
    MySwal.fire({
      title: <p>Hapus Guru ?</p>,
      html: (
        <p>
          Jika guru menjadi wali kelas, Kelas akan tetap ada tanpa wali kelas !
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
        props.deleteHandler(teacher_id);
      }
    });
  };

  const resetPassword = (user_id) => {
    MySwal.fire({
      title: <p>Reset Password ?</p>,
      html: <p>Anda akan mereset password pengguna !</p>,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Ya !",
      cancelButtonText: "Tidak !",
      icon: "warning",
    }).then((value) => {
      if (value.isConfirmed) {
        resetPasswordRequest(
          {
            method: "POST",
            url: "/reset-password",
            data: {
              user_id: user_id,
            },
          },
          (response) => {
            toast.success(response.message);
          }
        );
      }
    });
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="text-center card-box">
        <div>
          <img
            src={teacher.user.profile_picture_url}
            className="rounded-circle avatar-xl img-thumbnail mb-2"
            alt="profile"
          />
          <div className="text-left">
            <p className="text-muted font-13">
              <strong>Nama :</strong>
              <span className="ml-2">{teacher.user.name}</span>
            </p>
            <p className="text-muted font-13">
              <strong>Email :</strong>
              <span className="ml-2">{teacher.user.email}</span>
            </p>
          </div>
          <div className="row">
            <div className="col-12 align-self-center text-center">
              <button
                className="btn btn-success btn-sm m-1"
                onClick={() => {
                  editHandler(teacher);
                }}
              >
                <i className="mdi mdi-square-edit-outline"></i>
              </button>
              <button
                className="btn btn-warning btn-sm m-1"
                onClick={() => {
                  resetPassword(teacher.user.id);
                }}
              >
                <i className="mdi mdi-key"></i>
              </button>
              <button
                className="btn btn-danger btn-sm m-1"
                onClick={() => {
                  deleteHandler(teacher.id);
                }}
              >
                <i className="mdi mdi-delete"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
