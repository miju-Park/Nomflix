import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { moviesAPI, tvAPI } from "../../api";
export interface DetailInterface {
  result: any;
  error: string;
  loading: boolean;
}
interface ParamsInterface {
  id: string;
}
export default function DetailContainer() {
  const { pathname } = useLocation();
  const [state, setState] = useState({
    result: null,
    loading: true,
    error: "",
    isMovie: pathname.includes("/movie/"),
  });
  const { result, loading, error, isMovie } = state;
  const { id } = useParams<ParamsInterface>();
  const { push } = useHistory();

  useEffect(() => {
    async function get() {
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        return push("/");
      }
      let result = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesAPI.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvAPI.showDetail(parsedId));
        }
        setState({ ...state, loading: false, result });
      } catch (e) {
        setState({ ...state, error: "Can't find anything", loading: false });
      }
    }
    get();
  }, []);
  return <DetailPresenter result={result} loading={loading} error={error} />;
}
