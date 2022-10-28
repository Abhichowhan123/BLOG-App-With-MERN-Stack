import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React,{ useState,useEffect } from 'react'

const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const BlogDetail = () => {

  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id)
  const fetchDetail = async()=>{
    const res = await axios.get(`http://localhost:5000/blog/${id}`).catch(error=>console.log(error));
    const data=  await res.data;
    return data;
  };
  useEffect(()=>{
    fetchDetail().then((data)=>{
      setBlog(data.blog)
      setInput({
                title:data.blog.title,
                description:data.blog.description,
                })
    });
  },[id]);
  // console.log(blog);

  const [input,setInput]=useState({});
  const handleChange = (e)=>{
    setInput((prevState)=>({
      ...prevState,
    [e.target.name]:e.target.value,
  }))
}
  
  
  const sendRequest = async()=>{
    const res = await axios.put(`http://localhost:5000/blog/update_blog/${id}`,
    {
      title:input.title,
      description :input.description,
          }).catch((error)=>console.log(error))
        }
  

  const handelSubmit = (e)=> {
    e.preventDefault();
    console.log(input);
    sendRequest().then(data=>console.log(data))
  };
  return (

    <div>
      {input &&
        <form onSubmit={handelSubmit}>
    <Box border={3}
          borderColor="red" 
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3} 
          margin={'auto'}
          marginTop={3}
          display='flex'
          flexDirection={'column'}
          width = {"60%"}>
      <Typography fontWeight={'bold'} 
                  padding={3}
                  color="grey"
                  variant='h2'
                  textAlign={'center'} >Post Your Blog</Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField name = "title" onChange={handleChange} value={input.title} margin='normal' variant='outlined' />
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField name = "description"  onChange={handleChange} value={input.description} margin='normal' variant='outlined'/>


      <Button sx={{mt:2,borderRadius:4}}
                variant ="contained"
                color='warning'
                type='submit'>Submit</Button>
    
    </Box>
  </form>}
  </div>
  )
}

export default BlogDetail