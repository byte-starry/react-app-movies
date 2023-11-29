import Movies from './GetMovies';
import AddMovies from './AddMovies';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Movies />} />
      <Route path='/add' element={<AddMovies />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
