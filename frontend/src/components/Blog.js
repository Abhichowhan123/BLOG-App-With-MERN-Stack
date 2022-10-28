import React from 'react'
import { Avatar,CardContent,CardHeader,CardMedia,Typography,Card, Box, IconButton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const Blog = ({title,description,imageURL,userName,isUser ,id}) => {
  // console.log(id);
  console.log(title,isUser);

    const naviagte = useNavigate();
    const handelEdit = (e)=>{
        naviagte(`/my_blogs/${id}`);
    }
  return (
    <div> 
      {" "}
      <Card sx={{   
                width: "40%",
                margin:'auto',
                mt:2,padding:2,
                boxShadow:"5px 5px 10px #ccc",
                ":hover":{ boxShadow:"10px 10px 20px #ccc"},
                }}>
        {isUser&&(  
            <Box display={'flex'}>
                <IconButton onClick={handelEdit} sx = {{marginLeft:'auto'}}><ModeEditIcon/></IconButton>
                {/* <IconButton onClick={handelDelete} sx = {{marginLeft:'auto'}}><DeleteIcon/></IconButton> */}
            </Box>
        )}

    <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: 'red'}} aria-label="recipe">
            {userName[0].toUpperCase()}
        </Avatar>
      }
      title={title}
      
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    
  </Card></div>
  )
}

export default Blog