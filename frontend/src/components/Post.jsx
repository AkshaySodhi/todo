function Post({ post, onDeletePost }) {
  return (
    <div className="w-52 border-2 border-gray-700 p-4 relative bg-gray-400 bg-opacity-5 rounded">
      <h2 className="text-3xl">{post.title}</h2>
      <p className="text-m">{post.content}</p>
      <button
        className="top-4 right-4 absolute"
        onClick={() => onDeletePost(post._id)}
      >
        X
      </button>
    </div>
  );
}

export default Post;
