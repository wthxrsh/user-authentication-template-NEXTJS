"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("User created successfully");
            router.push("/login");
            
        }catch(error){
            console.error("Signup error:", error);
            toast.error(error?.response?.data?.message || error.message || "An error occurred during signup");
        }finally{
            setLoading(false);   
        }
    }


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);



    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <h1 className="text-white">{loading? "Processing.." : "Signup"}</h1>
            <br />
            <label className="text-white" htmlFor="username">username</label>
            <input className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="username" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})} placeholder="username"/>

            <label className="text-white" htmlFor="email">email</label>
            <input className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} placeholder="email"/>

            <label className="text-white" htmlFor="password">password</label>
            <input className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} placeholder="password"/>

            <button onClick={onSignup} className="bg-blue-500 text-white p-2 rounded-lg mb-4 hover:bg-blue-600" >{buttonDisabled ? "No Sign Up": "Sign up"}</button>
            <Link className="text-white" href="/login">Visit Login Page</Link>
        </div>
    )
}