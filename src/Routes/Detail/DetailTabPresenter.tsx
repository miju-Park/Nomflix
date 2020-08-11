import React from "react";

type VideoType = {
  key: string;
  site: string;
  type: string;
  name: string;
};

type TabInterface = {
  menu: string;
  info: {
    videos: {
      results: Array<VideoType>;
    };
  };
};

const DetailTabPresenter = ({ menu, info }: TabInterface) => {
  if (menu === "video") {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${info.videos.results[0].key}`}
      ></iframe>
    );
  }
  return <div>Tabbbbb {info.videos.results[0].key}</div>;
};

export default DetailTabPresenter;
