import {React,  useState} from 'react'
import {Link} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography,Box, Tab,Tabs } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../store';

const Header = () => {
  const dispath = useDispatch()
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  const [value,setvalue] = useState()
  return (
            <AppBar position='sticky' 
            sx={{background:"linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(213,0,0,1) 80%, rgba(252,176,69,1) 100%)"}}>
    <Toolbar>
        <Typography variant='h4'>BlogsApp</Typography>
        {isLoggedIn &&<Box display="flex">
          <Tabs textColor='inherit' 
              value = {value} 
              onChange = {(event,value)=>setvalue(value)}>

            <Tab LinkComponent={Link} to= "/blogs" label="All Blogs"/>
            <Tab LinkComponent={Link} to= "/my_blogs" label = "My Blogs"/>
            <Tab LinkComponent={Link} to= "/add_blog" label = "Add Blog"/>
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
            {
            !isLoggedIn&& <><Button 
                LinkComponent={Link} to= "/auth"
                variant='contained'
                colour = "warning"
                sx={{margin :1 ,borderRadius:10}}
            >Login</Button>
            <Button 
                LinkComponent={Link} to= "/auth"
                variant='contained'
                colour = "warning"
                sx={{margin :1 ,borderRadius:10}}
            >Signup</Button> </>
            }
            {isLoggedIn&& 
            <Button 
            onClick={()=>dispath(authActions.logout())}
                LinkComponent={Link}
                to= "/auth"
                variant='contained'
                colour = "warning"
                sx={{margin :1 ,borderRadius:10}}
            >Logout</Button>}
        </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Header