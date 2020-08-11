import React from "react";
import { DetailInterface } from "./DetailContainer";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import Message from "../../Components/Message";
import DetailTabPresenter from "./DetailTabPresenter";
import { Link, useLocation } from "react-router-dom";

type ImageInterface = {
  bgImage: string;
};
const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props: ImageInterface) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props: ImageInterface) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const ImdbItem = styled.img`
  width: 45px;
  height: 38px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const TabContainer = styled.div`
  margin-top: 10px;
  width: 50%;
  height: 45px;
  /* display: flex;
  justify-content: center; */
  /* align-items: center; */
  /* justify-content: center; */
  /* overflow: hidden; */
  background-color: rgba(25, 25, 25, 0.6);
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 45px;
`;

const SLink = styled(Link)`
  width: 33%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 3px solid
    ${(props: { isActive?: boolean }) =>
      props.isActive ? "#a4b0be" : "transparent"};
  transition: border-bottom 0.5s ease-in-out;
`;
const TabBody = styled.div`
  margin-top: 8px;
  display: block;
  width: 100%;
  background-color: rgba(25, 25, 25, 0.6);
  height: auto;
`;
export default function DetailPresenter({
  result,
  loading,
  error,
}: DetailInterface) {
  const title = result?.original_title
    ? result?.original_title
    : result?.original_name;
  const pathInfo = useLocation();
  const { search: query, pathname } = pathInfo;
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color="#e74c3c" />
  ) : (
    <Container>
      <Helmet>
        <title>{title} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{title}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre: { name: string }, idx: number) =>
                  idx === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && <Divider>•</Divider>}
            {result.imdb_id && (
              <a
                target="_blank" rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${result.imdb_id}?tab=video`}
              >
                <ImdbItem
                  alt="IMDB Logo"
                  src={"https://img.icons8.com/color/48/000000/imdb.png"}
                />
              </a>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <TabHeader>
              <SLink
                isActive={query.includes("video")}
                to={`${pathname}?tab=video`}
              >
                Video
              </SLink>
              {result.production_companies &&
              <SLink
                isActive={query.includes("production")}
                to={`${pathname}?tab=production`}
              >
                Production
              </SLink>}
              {result.seasons &&
              <SLink
                isActive={query.includes("seasons")}
                to={`${pathname}?tab=seasons`}
              >
                Seasons
              </SLink>
}
            </TabHeader>
            <TabBody>
              <DetailTabPresenter menu={query.split("=")[1]} info={result} />
            </TabBody>
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );
}
