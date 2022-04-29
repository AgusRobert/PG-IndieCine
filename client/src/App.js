import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import TyC from "./Components/T&C/T&C";
import Profile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuthenticated && <Route path="/profile" element={<Profile />} />}
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/terms" element={<TyC />} />
          <Route exact path="/prueba" element={<MovieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
