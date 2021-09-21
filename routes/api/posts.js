const express = require("express");
const router = express.Router();

// posts Model
const Posts = require("../../models/Posts");

// @routes GET api/posts
// @desc GET (fetch) all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Items");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @routes GET api/posts
// @desc GET (fetch) a post
router.get("/:id", getPost, (req, res) => {
  // res.send(res.post);
  res.json(res.post);
  // try {
  //   const post = await Posts.findById(req.params.id);
  //   if (!post) throw Error("Post was not found. Make sure ID is correct.");

  //   res.status(200).json(post);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

// @routes POST api/posts
// @desc Create a post
router.post("/", async (req, res) => {
  const post = new Posts({
    title: req.body.title,
    body: req.body.body,
  });

  try {
    const newPost = await post.save();
    if (!newPost) throw Error("Something went wrong while saving the post.");

    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @routes DELETE api/posts/:id
// @desc Delete a post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted a post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // try {
  //   const post = await Posts.findByIdAndDelete(req.params.id);
  //   if (!post) throw Error("No Post was found!");
  //   res.status(200).json({ success: true });
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

// @routes UPDATE api/posts/:id
// @desc Update a post
router.patch("/:id", getPost, async (req, res) => {
  // in order to update, only update for things that are actually are sent to us in the request.
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.body != null) {
    res.post.body = req.body.body;
  }
  try {
    const updatedPost = await res.post.save();
    // res.json({ message: "Post was successfully updated." }, updatedPost); // cant do this
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // try {
  //   const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
  //   if (!post) throw Error("Something went wrong while updating.");
  //   res.status(200).json({ success: true });
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

// Middleware function that acts as (req, res)
async function getPost(req, res, next) {
  let post;
  try {
    post = await Posts.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find the post." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;
