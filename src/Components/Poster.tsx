import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type PosterInterface = {
  id: string;
  url: string;
  title: string;
  rating?: number;
  year?: string;
  isMovie?: boolean;
};

type ImageInterface = {
  bgUrl: string;
};

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props: ImageInterface) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.2s linear;
`;
const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s linear;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;
const Title = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
`;
const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({
  id,
  url,
  title,
  rating,
  year,
  isMovie = false,
}: PosterInterface) => (
  <Link to={isMovie ? `/movie/${id}?tab=video` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            url
              ? `https://image.tmdb.org/t/p/w300/${url}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);
export default Poster;
