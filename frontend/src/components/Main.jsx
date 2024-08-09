import Post from "./Post";

function Main({ posts, onDeletePost }) {
  return (
    <div className="flex gap-5 mt-2 p-10">
      {posts.map((p, i) => (
        <Post key={i} post={p} onDeletePost={onDeletePost} />
      ))}
    </div>
  );
}

export default Main;
