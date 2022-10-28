import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

//Get all Blogs
export const getAllBlog = async(req,res,next)=>{
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (error) {
        return console.log(error);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blog Found"});

    }
    return res.status(200).json({blogs})
}
// add blogs
export const addBlog = async(req,res,next)=>{
    const {title,description,image,user}=req.body;

    let existingUser;
    
    try {
        existingUser =await User.findById(user)
    } catch (error) {
        return console.log(error);
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user By this Id"})
    }
    try {
        const  session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error });
    }
    return res.status(200).json({blog })
    // post request 
    // localhost:5000/blog/add_blog      URL
    // {
    //     "titel":"my new Blog",
    //     "description":"this is my first blog",
    //     "image":"ccccccccccccccccc",
    //     "user":"12541263"
        
    // }
}
//update blogs
export const updateBlog = async(req,res,next)=>{
    const {tittle,description} = req.body;
    const blogID = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogID,{
            tittle,description})
        } catch (error) {
            return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"unableto update the Blog"})
    }
    return res.status(200).json({blog})
}
// get blogs by id
export const getByIdBlog = async(req,res,next)=>{
    
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(Id)
        } catch (error) {
            return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog})
}
//delete bloges
export const deleteBlog = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        console.log(blog)
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        } catch (error) {
            return console.log(error);
    }
    if(!blog){
        return res.status(400).json({message:"Unable To Delete"})
    }
    return res.status(200).json({blog})
    // delete blog from single blog user id
    // localhost:5000/blog/delete_blog/634e66ce59359839bc5d80d6
    
}
// get blogs by user id 
export const getByUserId = async(req,res,next)=>{
    const userId = req.params.id;
    // console.log(userId)
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
        
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs){
        return res.status(400).json({message:" No Blog Found"})
    }
    return res.status(200).json({user:userBlogs})
    // get all blog from user using user id
    // localhost:5000/blog//get_userById/634db48f3ca78bf1d08fcab7

}