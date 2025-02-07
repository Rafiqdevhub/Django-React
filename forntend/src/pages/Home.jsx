import { useEffect, useState } from "react";
import "../styles/home.css";
import api from "../api";
import Note from "../components/Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNotes = async () => {
    try {
      const res = await api.get("/api/notes/");
      const data = res.data;
      setNotes(data);
      console.log(data);
    } catch (err) {
      alert(err);
      console.error("Error fetching notes:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await api.delete(`/api/notes/delete/${id}/`);
      if (res.status === 204) {
        alert("Note deleted successfully");
        getNotes();
      } else {
        alert("Error deleting note");
      }
    } catch (err) {
      alert(err);
      console.error("Error deleting note:", err);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", {
        title: title,
        content: content,
      });
      if (res.status === 201) {
        alert("Note created successfully");
        setTitle("");
        setContent("");
        getNotes();
      } else {
        alert("Error creating note");
      }
    } catch (err) {
      alert(err);
      console.error("Error creating note:", err);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Home;
