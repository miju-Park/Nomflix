import React from "react";
import { MovieInterface } from "./HomeContainer";
import styled from "styled-components";
import Section from "../../Components/Section";

const Container = styled.div`
  padding: 0px 10px;
`;

const Home = ({
  nowPlaying,
  upcoming,
  topRated,
  popular,
  error,
  loading,
}: MovieInterface) => {
  return loading ? null : (
    <Container>
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Movies">
          {upcoming.map((movie) => movie.title)}
        </Section>
      )}
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => movie.title)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Moviews">
          {popular.map((movie) => movie.title)}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="Top Ratied Movies">
          {topRated.map((movie) => movie.title)}
        </Section>
      )}
    </Container>
  );
};

export default Home;
