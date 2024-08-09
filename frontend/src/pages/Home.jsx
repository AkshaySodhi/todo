import { useState, useEffect } from "react";
import Head from "../components/Head";
import Main from "../components/Main";
import { useAuthContext } from "../context/authContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("error fetching posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
  }, [authUser]);

  const handleAddPost = async (title, content) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error(`error adding post`);

      const data = await res.json();
      setPosts(() => [...posts, data.newPost]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeletePost = async (_id) => {
    try {
      const res = await fetch(`/api/posts/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("error del post");
      setPosts((posts) => posts.filter((post) => post._id !== _id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error("error during logout!");
      }

      localStorage.removeItem("todo-user");
      setAuthUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head onAddPost={handleAddPost} onLogout={handleLogout} />
      <Main posts={posts} onDeletePost={handleDeletePost} />
    </>
  );
}

export default Home;
