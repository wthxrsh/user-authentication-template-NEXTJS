"use client"

import axios from "axios"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try{
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
            toast.success("Email verified successfully");
        }catch(error: any) {
            console.error("Verification error:", error);
            console.log(error?.response?.data?.error || error.message || "An error occurred during email verification");
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [])
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token? `${token}`:"no token"}</h2>
            {verified && (<div>
                <p className="text-green-500">Email verified successfully!</p>
            <Link href="/login">Login</Link>
            </div>
            )}
            

            {error && <div> 
                
            <p className="text-red-500">Error verifying email. Please try again.</p>
            
            </div>}

        </div>
    )
}