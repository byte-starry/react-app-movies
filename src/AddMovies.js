import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddMovies = () => {
  const [formData, setFormData] = useState({
    title: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      setFormData({
        title: '',
        rating: 0,
      });

    } catch (error) {
      console.error('Error posting data:', error.message);
    }

    
  };

  const navigate = useNavigate();
  const navigateGet = () => {
  navigate('/');
  };

  return (
    <>
      <h1>Add Movies</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange}/>
        </label>
        <label>
          Rating:
          <input type="text" name="rating" value={formData.rating} onChange={handleInputChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <button onClick={navigateGet}>Movies List</button>
      </div>
    </>
  );
};

export default AddMovies;
