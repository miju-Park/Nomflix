import React from "react";
import { MovieInterface } from "./HomeContainer";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";

const Container = styled.div`
  padding: 20px;
`;

const Home = ({
  nowPlaying,
  upcoming,
  topRated,
  popular,
  error,
  loading,
}: MovieInterface) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => (
            <span key={movie.id}>{movie.title}</span>
          ))}
        </Section>
      )}
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => (
            <span key={movie.id}>{movie.title}</span>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Moviews">
          {popular.map((movie) => (
            <span key={movie.id}>{movie.title}</span>
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Ratied Movies">
          {topRated.map((movie) => (
            <span key={movie.id}>{movie.title}</span>
          ))}
        </Section>
      )}
    </Container>
  );
};

export default Home;
