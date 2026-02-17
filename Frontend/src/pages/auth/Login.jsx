import React, { useState } from 'react';
import { Mail, Lock, Loader, FaEye, FaEyeSlash } from '../../constants/icons';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../components/store/authStore';
import Button from '../../components/ui/Button';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const user = await login(data.email, data.password);
            toast.success("Login successful!");

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white text-gray-700 max-w-lg w-full p-8 rounded-2xl shadow-xl border border-indigo-50/50"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
                </div>

                {/* Email Input */}
                <div className="mb-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600 block mb-1.5 ml-1">Email Address</label>
                    <div className={`flex items-center border rounded-xl transition-all duration-200 gap-3 px-4 py-2.5 ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-indigo-50/10 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'}`}>
                        <Mail size={18} className={errors.email ? 'text-red-400' : 'text-gray-400'} />
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                        />
                    </div>
                    <div className="h-5 mt-1">
                        {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-600 block mb-1.5 ml-1">Password</label>
                    <div className={`flex items-center border rounded-xl transition-all duration-200 gap-3 px-4 py-2.5 ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-indigo-50/10 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'}`}>
                        <Lock size={18} className={errors.password ? 'text-red-400' : 'text-gray-400'} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Password must be at least 4 characters long"
                                }
                            })}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-indigo-500 h-8 w-8"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </Button>
                    </div>
                    <div className="h-5 mt-1">
                        {errors.password && <p className="text-red-500 text-xs font-medium ml-1">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8 px-1">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <input type="checkbox" id="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                        <label htmlFor="checkbox" className="text-sm text-gray-600 cursor-pointer group-hover:text-indigo-600 transition-colors">Remember me</label>
                    </div>
                    {/* <Link to="/forgot-password" placeholder="Forgot Password" className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4">
                        Forgot Password?
                    </Link> */}
                </div>

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-indigo-100"
                    style={{ backgroundColor: '#66659F' }} // Preserving the specific color from original
                >
                    Sign In
                </Button>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-indigo-600 font-bold hover:underline underline-offset-4">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
