import React from "react";
import { SearchInterface } from "./SearchContainer";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";

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
                <span key={movie.id}>{movie.title}</span>
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Shows Results">
              {tvResults.map((show) => (
                <span key={show.id}>{show.name}</span>
              ))}
            </Section>
          )}
        </>
      )}
    </Container>
  );
}
