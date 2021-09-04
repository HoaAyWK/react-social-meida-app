const Post = require('../models/post');

module.exports.createNewPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();       
        res.status(201).json(post);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.getAPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

module.exports.getAllUserPost = async (req, res) => {
    const userId = req.params.id;
    try {        
        const posts = await Post.find({userId});
        res.status(200).json({
            length: posts.length,
            posts
        });
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.likeOrDislikeAPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId}});
            res.status(200).json({message: 'The post has been liked'});
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json({message: 'The post has been disliked'});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.updateAPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json({message: 'The post has been updated'});
        } else {
            res.status(403).json({message: 'You can update only your post'});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.deleteAPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (req.body.userId === post.userId) {
            await post.deleteOne();
            res.status(200).json({message: 'The post has been deleted'});
        } else {
            res.status(403).json({message: 'You can delete only your post'});
        }
    } catch(err) {
        res.status(200).json({message: err.message});
    }
};