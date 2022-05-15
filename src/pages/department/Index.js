import Layout from "../../components/layouts/Layout";
import List from "../../components/department/List";

const Index = () => {
  return (
    <Layout title="Jurusan">
      <div className="row">
        <div className="col-12 text-right my-2">
          <button className="btn btn-sm btn-primary">Tambah Jurusan</button>
        </div>
        <List />
      </div>
    </Layout>
  );
};

export default Index;
