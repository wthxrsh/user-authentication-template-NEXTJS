"use client";
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("Nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout successful");
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error("Logout failed: " + error.message);
        }
    }

    const getUserDetails = async () =>{
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);

        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <h1 className="text-white">Profile Page</h1>
            <p className="text-white">This is your profile page.</p>
            <h2 className=' bg-white p-3'> {data === "Nothing"? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>} </h2>
            <button className="bg-green-800 text-white p-2 rounded-lg mb-4 hover:bg-blue-600" onClick={getUserDetails}>Get User Details</button>
            <button className="bg-blue-500 text-white p-2 rounded-lg mb-4 hover:bg-blue-600" onClick={logout}>Logout</button>
        </div>
    );
