import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${process.env.VITE_API_URL}/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  // Date
  const formattedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Loading UI
  if (loading) {
    return (
      <div style={styles.center}>
        <h2 style={{ margin: 0 }}>Loading blog...</h2>
        <p style={{ marginTop: "6px", color: "#555" }}>
          Please wait a moment 💙
        </p>
      </div>
    );
  }

  // Shows error loading UI
  if (error) {
    return (
      <div style={styles.center}>
        <h2 style={{ margin: 0, color: "red" }}>Oops!</h2>
        <p style={{ marginTop: "6px", color: "#444" }}>{error}</p>
        <Link style={styles.backBtn} to="/">
          ⬅ Back to Home
        </Link>
      </div>
    );
  }

  // Shows if blog not found
  if (!blog) {
    return (
      <div style={styles.center}>
        <h2 style={{ margin: 0 }}>Blog not found 😕</h2>
        <Link style={styles.backBtn} to="/">
          ⬅ Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      
      <div style={styles.topBar}>
        <Link style={styles.backBtn} to="/">
          ⬅ Back
        </Link>

        <Link style={styles.editBtn} to={`/edit/${blog._id}`}>
          ✏️ Edit Blog
        </Link>
      </div>

      
      <div style={styles.card}>
        <h1 style={styles.title}>{blog.title}</h1>

        <p style={styles.date}>
          📅 <span style={{ fontWeight: "600" }}>Created:</span> {formattedDate}
        </p>

        <hr style={styles.line} />

        <p style={styles.content}>{blog.content}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  topBar: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },

  backBtn: {
    padding: "10px 14px",
    background: "#111827",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
  },

  editBtn: {
    padding: "10px 14px",
    background: "#2563eb",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0px 4px 14px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#111",
    textAlign: "left",
    lineHeight: "1.2",
  },

  date: {
    marginTop: "10px",
    marginBottom: "0px",
    fontSize: "14px",
    color: "#555",
    background: "#f3f4f6",
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
  },

  line: {
    margin: "18px 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  },

  content: {
    margin: 0,
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.8",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  },

  center: {
    width: "100%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    textAlign: "center",
  },
};
