
import  Header  from './components/Header.js';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs.js'
import AddBlog from './components/AddBlog.js'
import BlogDetail from './components/BlogDetail.js'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth.js';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
        <Route path="/auth" element = { <Auth/>}/>
        <Route path="/blogs" element = { <Blogs/>}/>
        <Route path="/my_blogs" element = { <UserBlogs/>}/>
        <Route path="/my_blogs/:id" element = { <BlogDetail/>}/>
        <Route path="/add_blog" element = { <AddBlog/>}/>
      </Routes>
    </main>

  </React.Fragment>;
}

export default App;
