import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import TyC from "./Components/T&C/T&C";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import SignInForm from "./Components/SignInForm/SignInForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/signin" element={<SignInForm />} /> */}
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/terms" element={<TyC />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
