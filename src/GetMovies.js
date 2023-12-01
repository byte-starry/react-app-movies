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
    <><table id='movieTable'>
    {/* <div>
    {data && (
              <ul>
                  {data.map((item, index) => (
                      <li key={index}>{item.ID}</li>
                  ))}
              </ul>
          )}
    </div> */}
   <thead>
    <tr>
      <th>TITLE</th>
      <th>RATING</th>
      <th>DELETE</th>
      <th>UPDATE</th>
    </tr>
   </thead>
   <tbody>
   {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.rating}</td>
                <td>
                  <button >Delete</button>
                </td>
                <td><button>Update</button></td>
              </tr>
            ))}
          
    </tbody>
    </table>
    <div>
      <button onClick={navigateAdd}>Add Movie</button>
    </div>
    
    </>
  );
};

export default Movies;
