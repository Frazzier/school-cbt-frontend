import { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Layout from "../../components/layouts/Layout";
import List from "../../components/department/List";
import AddForm from "../../components/department/AddForm";
import EditForm from "../../components/department/EditForm";

const Index = () => {
  const [editDepartment, setEditDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formType, setFormType] = useState("add");
  const {
    loading: fetchDepartmentsLoading,
    sendRequest: fetchDepartmentsRequest,
  } = useHttp();

  const fetchDepartments = useCallback(() => {
    fetchDepartmentsRequest(
      {
        method: "GET",
        url: "/department",
      },
      (response) => {
        setDepartments(response.departments);
      }
    );
  }, [fetchDepartmentsRequest]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const editHandler = (department) => {
    setEditDepartment(department);
    setFormType("edit");
  };

  return (
    <Layout title="Jurusan">
      <div className="row">
        {formType === "add" && <AddForm setDepartments={setDepartments} />}
        {formType === "edit" && (
          <EditForm
            editDepartment={editDepartment}
            departments={departments}
            setDepartments={setDepartments}
            setFormType={setFormType}
          />
        )}
        <List
          fetchDepartmentsLoading={fetchDepartmentsLoading}
          departments={departments}
          setDepartments={setDepartments}
          editHandler={editHandler}
        />
      </div>
    </Layout>
  );
};

export default Index;
