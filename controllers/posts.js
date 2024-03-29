


// import Post from "../modals/Post";
const Post = require("../modals/Post")
// import User from "../modals/user";
const User = require ("../modals/user")

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    // console.log('create[pst', req.body)
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      report: {},
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* CREATE */
const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment , name , picturePath , time} = req.body;
    const post = await Post.findById(id);
    post.comments.push({ userId, comment , name , picturePath , time});
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const reportPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.report.get(userId);

    if (isLiked) {
      post.report.delete(userId);
    } else {
      post.report.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { report: post.report },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};





/* DELETE */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports =  {createPost,createComment,getFeedPosts, getUserPosts, likePost,reportPost,deletePost};