import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import TyC from "./Components/T&C/T&C";
import Profile from "./Components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import { FilmForm } from "./Components/MovieForm/FilmForm";
import { PruebaFacu } from "./Components/MovieForm/PruebaFacu";
import NotFound from "./Components/NotFound/NotFound";
import Subs from "./Components/Subs/Subs";
import Subs3 from "./Components/Subs/Subs3";
import Subs2 from "./Components/Subs/Subs2";


function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <BrowserRouter>
   
      <div>
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuthenticated && <Route exact path="/profile" element={<Profile />} />}
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/terms" element={<TyC />} />
          <Route exact path="/prueba" element={<PruebaFacu />} />
          <Route exact path="/detail/:id" element={<MovieDetail />}/>
          {isAuthenticated && <Route exact path="/addFilm" element={<FilmForm />} />}
         < Route path="*" element= {<NotFound/>} /> 
         < Route path="/subs" element= {<Subs/>} />
         < Route path="/subs3" element= {<Subs3/>} />
         < Route path="/subs2" element= {<Subs2/>} />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
