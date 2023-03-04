// import Player from "./components/Player/Player";
// import PostButton from "./components/Nostr";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Submit from "./components/Submit";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/submit' element={<Submit />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
