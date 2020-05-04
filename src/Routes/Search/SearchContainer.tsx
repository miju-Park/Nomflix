import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
export interface SearchInterface {
  movieResults: null;
  tvResults: null;
  searchTerm: string;
  error: null;
  loading: boolean;
}
export default function SearchContainer() {
  const [state, setState] = useState({
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  });
  const { movieResults, tvResults, searchTerm, error, loading } = state;

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      error={error}
      loading={loading}
    />
  );
}
