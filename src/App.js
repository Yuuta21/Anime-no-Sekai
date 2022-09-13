import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Stream from "./components/Stream";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Details from "./components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [Data, setData] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);

  let url = `https://gogoanime.herokuapp.com/recent-release?page=${pageNumber}`;
  const nextPageHandler = () => {
    if (pageNumber < 313) setPageNumber((pageNumber) => pageNumber + 1);
    console.log(pageNumber);
  };
  const prevPageHandler = () => {
    if (pageNumber > 1)
      setPageNumber((pageNumber) => Math.max(1, pageNumber - 1));
    console.log(pageNumber);
  };

  useEffect(() => {
    async function fetchdata() {
      await fetch(url)
        .then((response) => response.json())
        .then((animelist) => {
          setData(animelist);
        });
    }
    fetchdata();
  }, [url]);

  return (
    <div className="App">
      <Header />
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="container">
                  <h2 className="recent_uploads_title">Recent Uploads</h2>
                  <div className="row row-col">
                    {Data &&
                      Data.map((Data) => (
                        <Cards key={Data.episodeId} Data={Data} />
                      ))}
                  </div>
                </div>
                <button className="left_button" onClick={prevPageHandler}>
                  prev page
                </button>
                <button className="right_button" onClick={nextPageHandler}>
                  next page
                </button>
              </div>
            }
          />
          <Route path="/vidcdn/watch/:episodeId" element={<Stream />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
