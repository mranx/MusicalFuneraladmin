"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

// ✅ Define Admin Login Validation Schema
const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Setup React Hook Form
  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
  });

  // ✅ Handle Admin Login
  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Login failed.");
      }
  
      const responseData = await response.json();
      const token = responseData.admin.token;
  
      if (!token) {
        throw new Error("Token not received from server.");
      }
  
      // ✅ Store Token in Local Storage
      localStorage.setItem("adminToken", token);
      console.log("Token saved:", localStorage.getItem("adminToken")); // Debugging
  
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (error: any) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg h-[470px] flex flex-col justify-between gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* ✅ Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold" style={{ fontFamily: "Inter" }}>
                    Email<span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Mail size={18} />
                    </span>
                    <FormControl>
                      <input
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#99C2FF] outline-none transition-all bg-white"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold" style={{ fontFamily: "Inter" }}>
                    Password
                  </FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <Lock size={18} />
                    </span>
                    <FormControl>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-[#99C2FF] outline-none transition-all bg-white"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Forgot Password Link */}
            <div className="text-right">
              
            </div>

            {/* ✅ Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* ✅ Success Message */}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            {/* ✅ Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3F72AF] hover:bg-[#172e4b] text-white rounded-full py-3 text-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
