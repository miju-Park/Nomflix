import React from "react";
import { SearchInterface } from "./SearchContainer";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;
const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

export default function SearchPresenter({
  movieResults,
  tvResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
  updateTerm,
}: SearchInterface) {
  return (
    <Container>
      <Helmet>
        <title>Search | Nomflix</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Seach Movies or TV Shows..."
          onChange={updateTerm}
          value={searchTerm}
        ></Input>
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  id={movie.id}
                  title={movie.title}
                  url={movie.poster_path}
                  year={movie.release_date.substring(0, 4)}
                  rating={movie.vote_average}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Shows Results">
              {tvResults.map((show) => (
                <Poster
                  id={show.id}
                  title={show.name}
                  url={show.poster_path}
                  year={show.first_air_date.substring(0, 4)}
                  rating={show.vote_average}
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} color="#e74c3c" />}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message
                text={`Nothing found for: ${searchTerm}`}
                color="#95a5a6"
              />
            )}
        </>
      )}
    </Container>
  );
}
