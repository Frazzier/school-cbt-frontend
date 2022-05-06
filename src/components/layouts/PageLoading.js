import RingLoader from "react-spinners/RingLoader";

const PageLoading = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: "50vh 50vw",
      }}
    >
      <RingLoader color="aqua" />
    </div>
  );
};

export default PageLoading;
