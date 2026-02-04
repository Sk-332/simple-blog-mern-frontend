import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(`${process.env.VITE_API_URL}/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch blog");
    }
  };

  useEffect(() => {
    if (id) fetchSingleBlog(); 
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.VITE_API_URL}/${id}`, { title, content });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Blog</h1>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}
        onSubmit={handleUpdate}
      >
        <input
          style={{ padding: "10px", fontSize: "16px" }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={{ padding: "10px", fontSize: "16px", height: "150px" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          style={{
            padding: "10px",
            fontSize: "16px",
            background: "purple",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}
