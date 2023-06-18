import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Error from "./Components/Error"
import Logout from "./Components/Logout"
import "./App.css"
import {
  BrowserRouter,Route,Routes
} from "react-router-dom";
function App() {
  return (
      <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route  path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
