import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../../hooks/use-http";

const Teacher = () => {
  const [homeroomClassId, setHomeroomClassId] = useState(null);
  const { sendRequest } = useHttp();
  useEffect(() => {
    sendRequest(
      {
        url: "/teacher/homeroom/class-id",
        method: "GET",
      },
      (response) => {
        if (response.homeroom_class_id) {
          setHomeroomClassId(response.homeroom_class_id);
        }
      }
    );
  }, [sendRequest, setHomeroomClassId]);

  return (
    <Fragment>
      <li>
        {homeroomClassId && (
          <NavLink to={`/class/${homeroomClassId}`} activeClassName="active">
            <i className="mdi mdi-home-variant-outline" />
            <span> Kelas </span>
          </NavLink>
        )}
      </li>
    </Fragment>
  );
};

export default Teacher;
