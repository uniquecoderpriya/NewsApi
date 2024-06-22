import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [myData, setMyData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("https://newsapi.org/v2/everything?q=tesla&from=2024-05-22&sortBy=publishedAt&apiKey=001aedb4a3484e898fabb439c42dc6ae")
      .then((res) => {
        // Check if the response data contains articles
        if (res.data && res.data.articles && Array.isArray(res.data.articles)) {
          setMyData(res.data.articles);
        } else {
          console.error("Invalid response format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle refreshing the data
  const handleRefresh = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % myData.length);
  };

  return (
    <>
      <h1>News</h1>
      {myData.length > 0 && (
        <div className="card">
          <h2>{myData[currentIndex].source.name}</h2>
          <h2>{myData[currentIndex].author}</h2>
          <h2>{myData[currentIndex].title}</h2>
          <h3>{myData[currentIndex].description}</h3>
        </div>
      )}
      <br></br> <br></br>
      <button onClick={handleRefresh} className="refresh">Refresh</button>
    </>
  );
}

export default App;
