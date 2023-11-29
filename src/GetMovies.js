import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Movies = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get('http://localhost:3000/movies');
        setData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the API call is made only once when the component mounts

  const navigate = useNavigate();
  const navigateAdd = () => {
      navigate('/add');
    };

  return (
    <>
    <div>
    {data && (
              <ul>
                  {data.map((item, index) => (
                      <li key={index}>{item.ID}</li>
                  ))}
              </ul>
          )}
    </div>
    <div>
          {data && (
              <ul>
                  {data.map((item, index) => (
                      <li key={index}>{item.title}</li>
                  ))}
              </ul>
          )}
    </div>
    <div>     
            {data && (
              <ul>
                  {data.map((item, index) => (
                      <li key={index}>{item.rating}</li>
                  ))}
              </ul>
          )}
    </div>
    <div>
      <button onClick={navigateAdd}>Add Movie</button>
    </div>
    </>
  );
};

export default Movies;
