import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from  "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import "./App.css";
import BlogDetails from "./pages/BlogDetails";

export default function App(){
    return(
     <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route  path="/create" element={<CreateBlog/>}/>
        <Route  path="/edit/:id" element={<EditBlog/>}/>
        <Route path="/blog/:id" element={<BlogDetails/>} />
      </Routes>
     </Router>
    );
}