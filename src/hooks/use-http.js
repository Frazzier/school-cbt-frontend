import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
axios.defaults.withCredentials = false;

export const useHttp = (params) => {
  const cancelTokenSource = useRef(axios.CancelToken.source());
  let history = useHistory();
  const authCtx = useRef(useContext(AuthContext));
  if (authCtx.current.isLoggedIn) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authCtx.current.token;
  }
  axios.defaults.headers.common["Accept"] = "application/json";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (params, applyResponse, loadingAfterApply = true) => {
      setLoading(true);
      try {
        const result = await axios.request(
          Object.assign(params, {
            cancelToken: cancelTokenSource.current.token,
          })
        );
        applyResponse(result.data);
        if (loadingAfterApply) {
          setLoading(false);
        }
      } catch (error) {
        if (error.message !== "request aborted") {
          setError(error.response);
          setLoading(false);
        }
      }
    },
    [cancelTokenSource]
  );

  const toastErrors = useCallback((error) => {
    var errors = error.data.errors ? error.data.errors : error.data;
    for (var key in errors) {
      var validation_error = errors[key];
      for (var message in validation_error) {
        toast.error(validation_error[message]);
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 422:
          toastErrors(error);
          break;

        case 401:
          if (error.data.message === "Unauthenticated.") {
            authCtx.current.logout();
            toast.error("Mohon Login Untuk Melanjutkan !");
          } else {
            toastErrors(error);
          }
          break;

        case 403:
          toast.error("Akses anda ditolak !");
          break;

        case 404:
          history.push("/not-found");
          break;

        case 405:
          toast.error("Aksi tidak dikenali !");
          break;

        default:
          console.log(error);
          break;
      }
    }
  }, [error, authCtx, toastErrors, history]);

  useEffect(() => {
    const cancelSignal = cancelTokenSource.current;
    return () => {
      cancelSignal.cancel("request aborted");
    };
  }, [cancelTokenSource]);

  return { error, loading, sendRequest, setLoading };
};

export default useHttp;
