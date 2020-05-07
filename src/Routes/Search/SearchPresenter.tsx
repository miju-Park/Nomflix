import React from "react";
import { SearchInterface } from "./SearchContainer";

export default function SearchPresenter({
  movieResults,
  tvResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
}: SearchInterface) {
  return <div>Search</div>;
}
