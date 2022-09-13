import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import "./Stream.css";
import EpisodeBox from "./EpisodeBox";

export default function Stream() {
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const { episodeId, currentEP } = state;
  const [episodeList, setEpisodeList] = useState([]);
  const animeTitle = episodeId.slice(
    0,
    episodeId.lastIndexOf(
      "-",
      episodeId.lastIndexOf("-", episodeId.lastIndexOf("-") - 1)
    )
  );
  useEffect(() => {
    const episodes = async () => {
      await fetch(`https://gogoanime.herokuapp.com/anime-details/${animeTitle}`)
        .then((response) => response.json())
        .then((animelist) => setEpisodeList(animelist.episodesList.reverse()));
    };
    const getVideo = async () => {
      try {
        const Video = await axios.get(
          `https://gogoanime.herokuapp.com/vidcdn/watch/${episodeId}`
        );
        const source = Video.data.sources;
        const first = source[0];
        setData(first.file);
      } catch (err) {
        console.log("Connection Error");
      }
    };
    getVideo();
    episodes();
  }, [episodeId, animeTitle]);
  return (
    <div className="player-wrapper">
      <div>
        {data && <ReactPlayer className="reactplayer" url={data} controls />}
      </div>

      {episodeList.map((data) => (
        <EpisodeBox
          key={data.episodeNum}
          keyprop={data.episodeNum}
          currentEP={currentEP}
          data={data}
        />
      ))}
    </div>
  );
}
