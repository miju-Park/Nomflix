import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  method: "get",
  params: {
    api_key: "656d6f5526ed70c14d4317dda8957fee",
    language: "en-US",
  },
});

export const tvAPI = {
  topRated: () => api.get("/tv/top_rated"),
  popular: () => api.get("/tv/popular"),
  airingToday: () => api.get("/tv/airing_today"),
  showDetail: (id) =>
    api.get(`/tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("/search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
export const moviesAPI = {
  nowPlaying: () => api.get("/movie/now_playing"),
  upcoming: () => api.get("/movie/upcoming"),
  topRated: () => api.get("/movie/top_rated"),
  popular: () => api.get("/movie/popular"),
  movieDetail: (id) =>
    api.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("/search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
