import React from "react";
import { MovieInterface } from "./HomeContainer";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

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
            <Poster
              key={movie.id}
              id={movie.id}
              isMovie={true}
              title={movie.title}
              year={movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              url={movie.poster_path}
            />
          ))}
        </Section>
      )}
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              isMovie={true}
              title={movie.title}
              year={movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              url={movie.poster_path}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Moviews">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              isMovie={true}
              title={movie.title}
              year={movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              url={movie.poster_path}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Ratied Movies">
          {topRated.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              isMovie={true}
              title={movie.title}
              year={movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              url={movie.poster_path}
            />
          ))}
        </Section>
      )}
      {error && <Message text={error} color="#e74c3c" />}
    </Container>
  );
};

export default Home;
