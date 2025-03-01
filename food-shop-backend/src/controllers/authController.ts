import  { Request, Response } from 'express';
import User from '../models/users';
import { getDeviceInfo,getLocationFromIp , getIpAddress } from '../utils/userUtils';

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