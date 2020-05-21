import React from "react";
import { TVInterface } from "./TVContainer";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

export default function TVPresenter({
  topRated,
  popular,
  airingToday,
  error,
  loading,
}: TVInterface) {
  return (
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && topRated.length > 0 ? (
            <Section title="Top Rated Shows">
              {topRated.map((show) => (
                <Poster
                  id={show.id}
                  title={show.name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  url={show.poster_path}
                />
              ))}
            </Section>
          ) : null}
          {popular && popular.length > 0 ? (
            <Section title="Popular Shows">
              {popular.map((show) => (
                <Poster
                  id={show.id}
                  title={show.name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  url={show.poster_path}
                />
              ))}
            </Section>
          ) : null}
          {airingToday && airingToday.length > 0 ? (
            <Section title="Airing Today">
              {airingToday.map((show) => (
                <Poster
                  id={show.id}
                  title={show.name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                  url={show.poster_path}
                />
              ))}
            </Section>
          ) : null}
          {error && <Message text={error} color="#e74c3c" />}
        </Container>
      )}
    </>
  );
}
