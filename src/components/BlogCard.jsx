import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, fetchBlogs }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.VITE_API_URL}/${blog._id}`);
      fetchBlogs();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // Date 
  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No date";

  return (
    <div style={styles.card}>
      
      <div style={styles.header}>
        <h3 style={styles.title}>{blog.title}</h3>
        <span style={styles.date}>{formattedDate}</span>
      </div>

      
      <p style={styles.content}>
        {blog.content.length > 140
          ? blog.content.slice(0, 140) + "..."
          : blog.content}
      </p>

      
      <div style={styles.btns}>
        <Link style={styles.readBtn} to={`/blog/${blog._id}`}>
          Read More
        </Link>

        <Link style={styles.editBtn} to={`/edit/${blog._id}`}>
          Edit
        </Link>

        <button style={styles.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

/* CSS styling for BlogCard + Responsive Css */
const styles = {
  card: {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "900px",
    margin: "10px auto",
    border: "1px solid #eee",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#111",
    textAlign: "left",
    flex: 1,
  },

  date: {
    fontSize: "13px",
    color: "#666",
    background: "#f3f4f6",
    padding: "4px 10px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },

  content: {
    margin: 0,
    color: "#444",
    lineHeight: "1.6",
    fontSize: "14px",
    textAlign: "left",
  },

  btns: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap", 
    marginTop: "6px",
  },

  readBtn: {
    padding: "8px 14px",
    background: "#16a34a",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
  },

  editBtn: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
  },

  deleteBtn: {
    padding: "8px 14px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
};
