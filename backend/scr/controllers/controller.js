import User from '../models/User.js'
import bcrypt from 'bcryptjs';


//get all user
export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if(!users){
        return res.status(404).json({message:"No users Found"})
    }
    return res.status(200).json(users);
}
// signup
export const signup = async(req,res,next)=>{
    const {name,email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});// chacking user is exists or not 
    } catch (error) {
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists"})
    }
    const hashedPassword  =bcrypt.hashSync(password);
    const user = new User({
       name,
        email,
        password:hashedPassword,
        blogs:[]
    });
    
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user})
    // signup in postman
    // localhost:5000/signup
    // {
    //     "name":"abhishekchowhan",
    //     "email":"abhichiowhan@gmail.com",
    //     "password":"5218969"
    // }
   
}

//login
export const login = async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});// chacking user is exists or not 
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"Couldt find user by this email"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if (!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login successfull",user:existingUser})
// login in postman
// localhost:5000/login
// {
//     "email":"abhichiowhan@gmail.com",
//     "password":"5218969"
// }
}