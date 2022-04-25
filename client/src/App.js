import './App.css';
import Home from "./components/Home/Home.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
