import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UpdateMovie from "./UpdateMovies";
import "./index.css";

const Movies = () => {
  const [data, setData] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the API call is made only once when the component mounts

  const navigate = useNavigate();
  const navigateAdd = () => {
    navigate("/add");
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      setData((prevData) => prevData.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const handleUpdatePopup = (id) => {
    setShowUpdatePopup(true);
    setSelectedMovieId(id);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedMovieId(null);
  };

  return (
    <>
    <h1 className="heading">MY MOVIES LIST</h1>
      <table className = "movie_table" id="movieTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>RATING</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.rating}</td>
                <td>
                <button
                    onClick={() => handleUpdatePopup(item.id)}
                    className="update-btn"
                  >
                    Update
                  </button>
                </td>
                <td>
                <button
                    onClick={() => deleteMovie(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button onClick={navigateAdd} className="add-btn">
          Add Movie
        </button>
      </div>
      {showUpdatePopup && (
        <UpdateMovie id={selectedMovieId} handleClose={closeUpdatePopup} />
      )}
    </>
  );
};

export default Movies;
