import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Blog from './Blog.js'

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async ()=>{
      const res = await axios.get("http://localhost:5000/blog")
      .catch(error=>console.log(error));
      const data =  await res.data;
      return data
  }
  useEffect(()=>{
    sendRequest().then((data)=>setBlogs(data.blogs));

  },[])
  
  return (
    <div>
      {blogs && blogs.map((blog,index)=>(
                            <Blog 
                            id = {blog._id}
                            isuser={localStorage.getItem("userId")===blog.user._id}
                            title={blog.title} 
                            description={blog.description}
                            imageURL= {blog.image}
                            userName = {blog.user.name}/>
                            ))}
    </div>
  )
}

export default Blogs