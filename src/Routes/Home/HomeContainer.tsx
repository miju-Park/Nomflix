import React, { useState } from "react";
import HomePresenter from "./HomePresenter";

export interface MovieInterface {
  nowPlaying: null;
  upcoming: null;
  topRated: null;
  popular: null;
  error: null;
  loading: boolean;
}

export default () => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    topRated: null,
    popular: null,
    error: null,
    loading: true,
  });
  const { nowPlaying, upcoming, topRated, popular, error, loading } = state;

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
