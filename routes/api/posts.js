const express = require('express');
const router = express.Router(); //it manipulates the routes 
//posts Model
const Posts = require('../../models/Posts');


//@routes GET api/posts
//@desc GET ALL posts
router.get('/', async (req, res) => {
    try{
        const posts = await Posts.find();
        if(!posts) throw Error('No Items');
        res.status(200).json(posts);
    }catch(error){
        res.status(400).json({msg: error})
    }
})


//@routes GET api/posts
//@desc GET a single post
router.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id);
        if(!post) throw Error('No Items');
        res.status(200).json(post);
    }catch(error){
        res.status(400).json({msg: error})
    }
})


//@routes POST api/posts
//@desc Create a post
router.post('/', async (req, res) => {
    
    const newPost = new Posts(req.body);

    try {
        const post = await newPost.save(); //sending the post to the MongoDB
        if(!post) throw Error('Something went wrong while saving the post...')

        res.status(200).json(post);

    } catch(error) {
        res.status(400).json({msg: error})
    }
   
});


//@routes DELETE api/posts/:id
//@desc delete a post
router.delete('/:id', async (req, res) => {
    try{
        const post = await Posts.findByIdAndDelete(req.params.id);
        if(!post) throw Error('No post found.');
        res.status(200).json({ success: true })
    }catch(error){
        res.status(400).json({ msg: error })
    }
})

//@routes UPDATE api/posts/:id
//@desc update a post
router.patch('/:id', async (req, res) => {
    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if(!post) throw Error('Something went wrong while updating the post.');
        res.status(200).json({ success: true });
    }catch(error){
        res.status(400).json({ msg: error });
    }
})


module.exports = router;