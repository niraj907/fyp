import React, { useState } from 'react';
import { Mail, Lock, User, Loader, FaEye, FaEyeSlash } from '../../constants/icons';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../components/store/authStore';


const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { signup, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await signup(name, email, password, confirmPassword);
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4 py-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white text-gray-700 max-w-lg w-full p-8 rounded-2xl shadow-xl border border-indigo-50/50"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join us to get started</p>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600 block mb-1.5 ml-1">Full Name</label>
                    <div className={`flex items-center border rounded-xl transition-all duration-200 gap-3 px-4 py-2.5 ${errors.name ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-indigo-50/10 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'}`}>
                        <User size={18} className={errors.name ? 'text-red-400' : 'text-gray-400'} />
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                            {...register("name", { required: "Name is required" })}
                        />
                    </div>
                    <div className="h-5 mt-1">
                        {errors.name && <p className="text-red-500 text-xs font-medium ml-1">{errors.name.message}</p>}
                    </div>
                </div>

                {/* Email */}
                <div >
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
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                    </div>
                    <div className="h-5 mt-1">
                        {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email.message}</p>}
                    </div>
                </div>

                {/* Password */}
                <div>
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
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-indigo-500 transition-colors"
                        >
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                    <div className="h-5 mt-1">
                        {errors.password && <p className="text-red-500 text-xs font-medium ml-1">{errors.password.message}</p>}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-600 block mb-1.5 ml-1">Confirm Password</label>
                    <div className={`flex items-center border rounded-xl transition-all duration-200 gap-3 px-4 py-2.5 ${errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-indigo-50/10 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100'}`}>
                        <Lock size={18} className={errors.confirmPassword ? 'text-red-400' : 'text-gray-400'} />
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPassword(!showConfirmPassword)}
                            className="text-gray-400 hover:text-indigo-500 transition-colors"
                        >
                            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                    </div>
                    <div className="h-5 mt-1">
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs font-medium ml-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#66659F] hover:bg-[#5a598d] disabled:bg-indigo-300 transition-all duration-300 py-3.5 rounded-xl text-white font-bold shadow-lg shadow-indigo-100 flex justify-center items-center active:scale-[0.98]"
                >
                    {isLoading ? (
                        <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                        "Create Account"
                    )}
                </button>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/" className="text-indigo-600 font-bold hover:underline underline-offset-4">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
