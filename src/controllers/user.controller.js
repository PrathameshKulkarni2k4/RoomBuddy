import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler( async (req, res) => {
    // get user details form frontend
    // validation - not empty
    // check if user already exists: username , email
    // crate user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    

    const {fullName, email, username, password, phoneNo } = req.body
    console.log("Received body:", req.body);
    console.log("email : ",email);
    console.log("fullName : ",fullName);
    
    if (
        [fullName, email, username, password, phoneNo].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400,"All fiels are required")
    } 

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username,
        phoneNo
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while registering a user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

} )


export {
    registerUser,
}