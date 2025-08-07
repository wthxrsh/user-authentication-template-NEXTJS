import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = request.json();
        const {email, password} = await reqBody;
        console.log(reqBody);

        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }
        // Here you would typically generate a JWT token and return it
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;

    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}