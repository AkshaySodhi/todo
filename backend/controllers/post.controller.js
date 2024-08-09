import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const posts = await user.populate("posts");
    if (!posts) return res.send(200).json([]);
    res.status(200).json(posts.posts);
  } catch (err) {
    console.log(`error in getPostContrl`, err.message);
    res.status(500).json({
      status: "internal server error",
    });
  }
};

export const addPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "invalid data",
      });
    }

    const posts = (await user.populate("posts")).posts;
    const titles = posts.map((p) => p.title);

    if (titles.includes(title)) {
      return res.status(400).json({ error: "a post with this title exists!" });
    }

    const newPost = new Post({
      title,
      content,
    });

    if (!newPost) {
      return res.status(400).json({
        error: "invalid data",
      });
    }

    user.posts.push(newPost._id);
    Promise.all([newPost.save(), user.save()]);
    res.status(200).json({
      newPost,
    });
  } catch (err) {
    console.log(`error in addpost contrll`, err.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        error: "post not found",
      });
    }

    res.status(200).json({
      status: "deleted post",
    });
  } catch (err) {
    console.log(`error in delpost contll`, err.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};
