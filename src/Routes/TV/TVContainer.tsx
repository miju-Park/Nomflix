import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvAPI } from "../../api";
export interface TVInterface {
  topRated: any[] | null;
  popular: any[] | null;
  airingToday: any[] | null;
  error: string;
  loading: boolean;
}
export default function TVContainer() {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    error: "",
    loading: true,
  });
  const { topRated, popular, airingToday, error, loading } = state;

  useEffect(() => {
    async function get() {
      try {
        const {
          data: { results: topRated },
        } = await tvAPI.topRated();
        const {
          data: { results: popular },
        } = await tvAPI.popular();
        const {
          data: { results: airingToday },
        } = await tvAPI.airingToday();
        setState({ ...state, topRated, popular, airingToday, loading: false });
      } catch (e) {
        setState({
          ...state,
          error: "Can't find TV information",
          loading: false,
        });
      }
    }
    get();
  }, []);

  console.log(state);
  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      error={error}
      loading={loading}
    />
  );
}
