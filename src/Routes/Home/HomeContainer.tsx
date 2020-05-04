import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesAPI } from "../../api";

export interface MovieInterface {
  nowPlaying: any[];
  upcoming: null;
  topRated: null;
  popular: null;
  error: string;
  loading: boolean;
}

export default () => {
  const [state, setState] = useState({
    nowPlaying: [],
    upcoming: null,
    topRated: null,
    popular: null,
    error: "",
    loading: true,
  });
  const { nowPlaying, upcoming, topRated, popular, error, loading } = state;

  useEffect(() => {
    async function get() {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesAPI.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesAPI.upcoming();
        const {
          data: { results: topRated },
        } = await moviesAPI.topRated();
        const {
          data: { results: popular },
        } = await moviesAPI.popular();
        setState({ ...state, nowPlaying, upcoming, topRated, popular });
      } catch (e) {
        setState({ ...state, error: "Can't find movies information." });
      } finally {
        setState({ ...state, loading: false });
      }
    }
    get();
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      topRated={topRated}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};
