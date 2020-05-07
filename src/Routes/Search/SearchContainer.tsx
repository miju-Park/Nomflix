import React, { useState, useEffect } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesAPI, tvAPI } from "../../api";
export interface SearchInterface {
  movieResults: null;
  tvResults: null;
  searchTerm: string;
  error: string;
  loading: boolean;
  handleSubmit: (term: string) => void;
}
export default function SearchContainer() {
  const [state, setState] = useState({
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: "",
    loading: false,
  });
  const { movieResults, tvResults, searchTerm, error, loading } = state;

  const searchByTerm = async (term: string) => {
    setState({ ...state, loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesAPI.search(term);
      const {
        data: { results: tvResults },
      } = await tvAPI.search(term);
      setState({ ...state, movieResults, tvResults, loading: false });
    } catch (e) {
      setState({ ...state, error: "Can't find results", loading: false });
    }
  };

  const handleSubmit = () => {
    if (searchTerm !== "") {
      searchByTerm(searchTerm);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
}
