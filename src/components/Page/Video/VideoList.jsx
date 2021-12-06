import React, { useState } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import "./VideoList.css";

const VideoList = (props) => {
  const [videoId, setVideoId] = useState(null);

  const videos = props.videos.map((video, index) => (
    <VideoItem
      key={index}
      snippet={video.snippet}
      videoId={video.id.videoId}
      onClick={() => {
        setVideoId(video.id.videoId);
      }}
    />
  ));

  return (
    <div className={"videos"}>
      <Switch>
        <Route
          exact
          path="/page/search"
          render={() => (
            <Redirect to={`/page/search/result/${props.textRequest}`} />
          )}
        />
        <Route
          path="/page/search/result/:textRequest?"
          render={() => (
            <VideoGrid
              textRequest={props.textRequest}
              videos={videos}
              totalCount={props.totalCount}
            />
          )}
        />
        <Route
          path="/page/search/watch/:videoId?"
          render={() => <Video videoId={videoId} />}
        />
      </Switch>
    </div>
  );
};

const VideoGrid = ({ videos, textRequest, totalCount }) => {
  const [listMode, setListMode] = useState(false);

  return (
    <>
      <div className={"request"}>
        <div className={"request__item"}>
          {`Видео по запросу "${textRequest}"`}
          <span className={"request__count"}>{`${totalCount}`}</span>
        </div>
        <div className={"request__item"}>
          <div
            onClick={() => {
              setListMode(false);
            }}
            className={"request__icon"}
          >
            <AppstoreOutlined />
          </div>
          <div
            onClick={() => {
              setListMode(true);
            }}
            className={"request__icon"}
          >
            <BarsOutlined />
          </div>
        </div>
      </div>
      <div className={listMode ? "videos--inner-list" : "videos--inner-grid"}>
        {videos}
      </div>
    </>
  );
};

const VideoItem = ({ snippet, onClick, videoId }) => {
  return (
    <NavLink to={`/page/search/watch/${videoId}`}>
      <div className={"video"} onClick={onClick}>
        <img className={"video__img"} src={snippet.thumbnails.high.url} />
        <div>
          <div className={"video__title"}>{snippet.title}</div>
          <div className={"video__chanel-title"}>{snippet.channelTitle}</div>
        </div>
      </div>
    </NavLink>
  );
};

const Video = ({ videoId }) => {
  return (
    <div className="videos__play">
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoList;
