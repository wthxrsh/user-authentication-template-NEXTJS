"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    if (!password) {
      toast.error("Please enter a new password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgotpassword", {
        token,
        password,
      });
      toast.success(res.data.message);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white text-2xl mb-4">Reset Your Password</h1>

      <input
        type="password"
        placeholder="Enter new password"
        className="text-white border
        border-white p-2 rounded mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Updating..." : "Set New Password"}
      </button>
    </div>
  );
}
