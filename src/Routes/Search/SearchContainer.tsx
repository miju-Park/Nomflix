import React, { useState, useEffect } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesAPI, tvAPI } from "../../api";
import { MovieType } from "../Home/HomeContainer";
import { TvType } from "../TV/TVContainer";
export interface SearchInterface {
  movieResults: Array<MovieType>;
  tvResults: Array<TvType>;
  searchTerm: string;
  error: string;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchContainer() {
  const [state, setState] = useState({
    movieResults: [],
    tvResults: [],
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm !== "") {
      searchByTerm(searchTerm);
    }
  };

  const updateTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: term },
    } = e;
    setState({ ...state, searchTerm: term });
  };

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  );
}
