import express from 'express';
const blogRouter   = express.Router();
import{ addBlog,getAllBlog,updateBlog,getByIdBlog,deleteBlog,getByUserId} from "../controllers/blog_controller.js"


blogRouter.get('/',getAllBlog)
blogRouter.post('/add_blog',addBlog)
blogRouter.put('/update_blog/:id',updateBlog)
blogRouter.get('/:id',getByIdBlog)
blogRouter.delete('/delete_blog/:id',deleteBlog)
blogRouter.get('/get_userById/:id',getByUserId)


export default blogRouter;