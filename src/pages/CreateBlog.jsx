import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";  // only once

export default function CreateBlog(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            return alert("Please fill all fields");
        }

        try {
            await api.post("/", { title, content });
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Blog creation failed");
        }
    };

    return (
        <div style={styles.container}>
            <h1>Create Blog</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    style={styles.textarea}
                    placeholder="Enter blog content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button style={styles.btn} type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: { padding: "30px" },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "500px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    textarea: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        height: "150px",
    },
    btn: {
        padding: "10px",
        fontSize: "16px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};
