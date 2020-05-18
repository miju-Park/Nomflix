import React, { useState, useEffect } from "react";
import HomePresenter from "./HomePresenter";
import { moviesAPI } from "../../api";

export type MovieType = {
  id: string;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
};

export interface MovieInterface {
  nowPlaying: Array<MovieType>;
  upcoming: Array<MovieType>;
  topRated: Array<MovieType>;
  popular: Array<MovieType>;
  error: string;
  loading: boolean;
}

export default () => {
  const [state, setState] = useState({
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    popular: [],
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
        setState({
          ...state,
          nowPlaying,
          upcoming,
          topRated,
          popular,
          loading: false,
        });
      } catch (e) {
        setState({
          ...state,
          error: "Can't find movies information.",
          loading: false,
        });
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
