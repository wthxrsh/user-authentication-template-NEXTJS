import Link from 'next/link';
import React from 'react';
export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
            <h1 className="text-white">Profile Page</h1>
            <p className="text-white">This is your profile page.</p>
            <Link className="text-blue-500" href="/">Go back to Home</Link>
        </div>
    );
}