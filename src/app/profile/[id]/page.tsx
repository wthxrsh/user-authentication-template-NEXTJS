import Link from 'next/link';
import React from 'react';
export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <h1 className="text-white">Profile Page</h1>
            <p className="text-white">This is your profile page of <span className='bg-orange-400 text-2xl p-2'>{params.id}</span> .</p>
            <Link className="text-blue-500" href="/">Go back to Home</Link>
        </div>
    );
}