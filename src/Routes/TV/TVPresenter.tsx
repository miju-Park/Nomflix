import React from "react";
import { TVInterface } from "./TVContainer";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";

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
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 ? (
        <Section title="Top Rated Shows">
          {topRated.map((show) => show.name)}
        </Section>
      ) : null}
      {popular && popular.length > 0 ? (
        <Section title="Popular Shows">
          {popular.map((show) => show.name)}
        </Section>
      ) : null}
      {airingToday && airingToday.length > 0 ? (
        <Section title="Airing Today">
          {airingToday.map((show) => show.name)}
        </Section>
      ) : null}
    </Container>
  );
}
