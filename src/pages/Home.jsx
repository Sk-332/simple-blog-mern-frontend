import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function Home(){
    const[blogs, setBlogs] = useState([]);

    const fetchBlogs=async()=>{
        try {
            const res = await axios.get(`${process.env.VITE_API_URL}`);
            setBlogs(res.data);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch blogs");
        };
    };
    useEffect(()=>{
        fetchBlogs();
    }, []);
    return(
        <div style={styles.container}>
        <h1 style={styles.heading}>All Blogs</h1>

        {
         blogs.length === 0 ? (
          <p>No blogs found.Create your first blog!</p>
         ):(
           <div style={styles.grid}>
              {blogs.map((blog) => (
           <BlogCard key={blog._id} blog={blog} fetchBlogs={fetchBlogs} />
         ))}

           </div>
         )
        }
        </div>
    );
}


const styles = {
  container: { padding: "30px" },
  heading: { marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
};