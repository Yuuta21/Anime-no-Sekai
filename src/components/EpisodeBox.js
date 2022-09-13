import React from "react";
import { useNavigate } from "react-router-dom";
import "./EpisodeBox.css";
function EpisodeBox({ data, keyprop, currentEP }) {
  if (parseInt(currentEP) === parseInt(data.episodeNum)) {
    const element = document.getElementsByClassName(keyprop);
    if (element[0]) {
      element[0].classList.add("current");
    }
  }
  const history = useNavigate();
  const navigateTo = () => {
    history(`/vidcdn/watch/${data.episodeId}`, {
      state: { episodeId: data.episodeId, currentEP: data.episodeNum },
    });
    const element = document.getElementsByClassName(currentEP);
    element[0].classList.remove("current");
  };
  return (
    <div className={`ep-box ${keyprop}`} style={{}} onClick={navigateTo}>
      <p className="ep-number">{data.episodeNum}</p>
    </div>
  );
}

export default EpisodeBox;
