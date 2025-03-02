import  { Request, Response } from 'express';
import User from '../models/users';
import { getDeviceInfo,getLocationFromIp , getIpAddress } from '../utils/userUtils';
import bcrypt from 'bcryptjs';

export const registerUser = async (request:Request, response:Response) : Promise<void> =>{
    try {
        const {username,login,password}= request.body
        
        if(!username || !login || !password){
            response.status(400).json({error:"Some data is missing"})
            return
        }
        //Check if the  user has already an account 
        const exisitingUser = await User.findOne({login})
        if(exisitingUser){
            response.status(400).json({error:"You are already registered"})
            return
        }
        //Check if the user is the first one
        const isFirstUser  = (await User.countDocuments()) === 0; 
        
        //Getting info about the user 
        const dataDevice = getDeviceInfo(request)
        const ipAddress =getIpAddress(request)
        const locationDevice =  getLocationFromIp(ipAddress)
        //Creating the user 
        const newUser = new User({
            username,
            login,
            password,
            isAdmin: isFirstUser, // First user becomes admin
            ipAddress:ipAddress,
            deviceInfo:dataDevice, 
            location:locationDevice
        });
        await newUser.save();

        response.status(201).json({ message: "User registered successfully", userId: newUser._id });
        return
    } catch (error:any) {
        response.status(500).json({ error: "Server error", details: error.message });
        return
    }
}
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { login, password } = req.body;
  
      // Validation 
      if (!login || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
  
      // Find the user
      const existingUser = await User.findOne({ login });
      if (!existingUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }
  
      // Successful login
      res.status(200).json({ 
        message: "User login successfully", 
        username: existingUser.username,
        isAdmin: existingUser.isAdmin,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Server error", details: error.message });
    }
  };
  