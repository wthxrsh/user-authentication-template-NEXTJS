"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success:", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error:any) {
            console.error("Login failed:", error);
            toast.error("Login failed: " + error.message);
            
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email && user.password){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <h1 className="text-white">{loading? "Processing" : "Login"}</h1>
            <br />

            <label className="text-white" htmlFor="email">email</label>
            <input className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} placeholder="email"/>

            <label className="text-white" htmlFor="password">password</label>
            <input className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} placeholder="password"/>

            <button onClick={onLogin} className="bg-blue-500 text-white p-2 rounded-lg mb-4 hover:bg-blue-600" >Login</button>
            <Link className="text-white" href="/signup">Visit Signup Page</Link>
        </div>
    )
}