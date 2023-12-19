import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const UpdateMovie = ({ id, handleClose, props }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchMovieDetails = async () => {
      try {
        console.log('fetching movies', id);
        const response = await axios.get(`http://localhost:3000/movies/getbyid/${id}`);
        
        console.log(response);
        if (isMounted && response.data[0]) {
          const { title, rating } = response.data[0];
          console.log('Fetched movie details:', { title, rating });
          setTitle(title);
          setRating(rating);
        } else {
          console.error('Empty response or unexpected data structure');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    if (id) {
      fetchMovieDetails();
    }

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleUpdate = async () => {
    // Make the update API call
    try {
      await axios.put(`http://localhost:3000/movies/${id}`, { title, rating });
      // Additional logic after successful update, if needed
      console.log("Movie updated successfully");
    } catch (error) {
      console.error("Error updating movie:", error.message);
    }
    //Reload page after submit to see updated value in list
    window.location.reload(false);

    // Close the popup
    handleClose();
  };

  return (
    <div className="popup display-block">
      <section className="popup-main">
        <h2>Update Movie</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Rating:</label>
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleClose}>Cancel</button>
      </section>
    </div>
  );
};

export default UpdateMovie;
