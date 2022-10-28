import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Blog from './Blog.js'

const UserBlogs = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:5000/blog/get_userById/${id}`)
    .catch(error=>console.log(error));
    const data=  await res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user));
  });
  console.log(user)
  return <div>
    {" "}
    {user && user.blogs && 
      user.blogs.map((blog,index)=>(
      <Blog  
        key={index}
        isUser = {true}
        title={blog.title} 
        description={blog.description}
        imageURL= {blog.image}
        userName = {user.name}/>
      ))}</div>;
  
}

export default UserBlogs