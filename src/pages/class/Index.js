import { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Layout from "../../components/layouts/Layout";
import List from "../../components/class/List";
import AddForm from "../../components/class/AddForm";
import EditForm from "../../components/class/EditForm";

const Index = () => {
  const [editClass, setEditClass] = useState([]);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    console.log(classes);
  }, [classes]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formType, setFormType] = useState("add");
  const { loading: fetchClassesLoading, sendRequest: fetchClassesRequest } =
    useHttp();
  const {
    loading: fetchDepartmentsLoading,
    sendRequest: fetchDepartmentsRequest,
  } = useHttp();
  const { loading: fetchTeachersLoading, sendRequest: fetchTeachersRequest } =
    useHttp();

  const fetchClasses = useCallback(() => {
    fetchClassesRequest(
      {
        method: "GET",
        url: "/class",
        params: {
          limit: -1,
        },
      },
      (response) => {
        setClasses(response.classes.data);
      }
    );
  }, [fetchClassesRequest]);

  const fetchDepartments = useCallback(() => {
    fetchDepartmentsRequest(
      {
        method: "GET",
        url: "/department",
        params: {
          limit: -1,
        },
      },
      (response) => {
        setDepartments(response.departments);
      }
    );
  }, [fetchDepartmentsRequest]);

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
    fetchClasses();
    fetchDepartments();
    fetchTeachers();
  }, [fetchClasses, fetchDepartments, fetchTeachers]);

  const editHandler = (class_) => {
    setEditClass(class_);
    setFormType("edit");
  };

  return (
    <Layout title="Kelas">
      <div className="row">
        {formType === "add" && (
          <AddForm
            fetchDepartmentsLoading={fetchDepartmentsLoading}
            fetchTeachersLoading={fetchTeachersLoading}
            teachers={teachers}
            departments={departments}
            setClasses={setClasses}
          />
        )}
        {formType === "edit" && (
          <EditForm
            fetchDepartmentsLoading={fetchDepartmentsLoading}
            fetchTeachersLoading={fetchTeachersLoading}
            teachers={teachers}
            departments={departments}
            editClass={editClass}
            classes={classes}
            setClasses={setClasses}
            setFormType={setFormType}
          />
        )}
        <List
          fetchClassesLoading={fetchClassesLoading}
          classes={classes}
          setClasses={setClasses}
          editHandler={editHandler}
        />
      </div>
    </Layout>
  );
};

export default Index;
