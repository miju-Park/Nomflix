import React, { useState } from "react";
import DetailPresenter from "./DetailPresenter";
export interface DetailInterface {
  result: null;
  error: null;
  loading: boolean;
}
export default function DetailContainer() {
  const [state, setState] = useState({
    result: null,
    loading: true,
    error: null,
  });
  const { result, loading, error } = state;
  return <DetailPresenter result={result} loading={loading} error={error} />;
}
