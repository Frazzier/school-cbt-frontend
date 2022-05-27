import { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Layout from "../../components/layouts/Layout";
import List from "../../components/teacher/List";
import AddForm from "../../components/teacher/AddForm";
import EditForm from "../../components/teacher/EditForm";

const Index = () => {
  const [editTeacher, setEditTeacher] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formType, setFormType] = useState("add");
  const { loading: fetchTeachersLoading, sendRequest: fetchTeachersRequest } =
    useHttp();

  const fetchTeachers = useCallback(() => {
    fetchTeachersRequest(
      {
        method: "GET",
        url: "/teacher",
        params: {
          limit: -1,
        },
      },
      (response) => {
        setTeachers(response.teachers.data);
      }
    );
  }, [fetchTeachersRequest]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const editHandler = (teacher) => {
    setEditTeacher(teacher);
    setFormType("edit");
  };

  return (
    <Layout title="Guru">
      <div className="row">
        {formType === "add" && <AddForm setTeachers={setTeachers} />}
        {formType === "edit" && (
          <EditForm
            editTeacher={editTeacher}
            teachers={teachers}
            setTeachers={setTeachers}
            setFormType={setFormType}
          />
        )}
        <List
          fetchTeachersLoading={fetchTeachersLoading}
          teachers={teachers}
          setTeachers={setTeachers}
          editHandler={editHandler}
        />
      </div>
    </Layout>
  );
};

export default Index;
