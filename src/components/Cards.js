import React from "react";
import "./Cards.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Cards({ Data }) {
  const history = useNavigate();
  const navigateTo = () =>
    history(`/vidcdn/watch/${Data.episodeId}`, {
      state: { episodeId: Data.episodeId, currentEP: Data.episodeNum },
    });
  return (
    <div className="card" onClick={navigateTo}>
      <img src={Data.animeImg} alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-text" datahover={Data.animeTitle}>
          {Data.animeTitle}
        </h5>
        <p className="episode">EP {Data.episodeNum}</p>
      </div>
    </div>
  );
}
