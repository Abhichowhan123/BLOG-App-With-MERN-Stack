import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'


const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}

const AddBlog = () => {
  const [input,setInput]=useState({
      title:'',
      description:'',
      imageUrl:"",

  });
  const sendRequest = async()=>{
    const res = await axios.post(`http://localhost:5000/blog/add_blog`,
    {
      title:input.title,
      description :input.description,
      image : input.imageUrl,
      user:localStorage.getItem("userId")
    }).catch((error)=>console.log(error))

    const data=  await res.data;
    console.log(data);
    return data
  }
  
  const handleChange = (e)=>{
    setInput((prevState)=>({
      ...prevState,
    [e.target.name]:e.target.value,
    }))
  }
  const handelSubmit=(e)=>{
    e.preventDefault();
    console.log(input);
    sendRequest().then((data)=>console.log(data));
 
  }
  return (
    <div>
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
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name = "imageUrl"  onChange={handleChange} value={input.imageUrl} margin='normal' variant='outlined'/>

          <Button sx={{mt:2,borderRadius:4}}
                    variant ="contained"
                    color='warning'
                    type='submit'>Submit</Button>
        
        </Box>
      </form>
    </div>
  )
}

export default AddBlog