import { useState } from "react";

function Head({ onAddPost, onLogout }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    await onAddPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="flex justify-center relative">
      <form
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
        onSubmit={handleSubmit}
        className="p-3"
      >
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered h-10 bg-gray-400 bg-opacity-5"
        ></input>
        <textarea
          placeholder="content"
          style={{ width: "30rem" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input input-bordered h-10 p-1 bg-gray-400 bg-opacity-5"
        ></textarea>
        <button type="submit">Add</button>
      </form>
      <button
        className="absolute right-4 top-4 bg-gray-400 bg-opacity-10 p-1 rounded"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Head;
