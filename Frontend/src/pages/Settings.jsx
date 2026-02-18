import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Lock, X, FaEye, FaEyeSlash } from '../constants/icons';
import { toast } from 'sonner';
import Button from '../components/ui/Button';
import axiosPrivate from "@/utils/axiosPrivate";
import { useMutation } from "@tanstack/react-query";

const changePasswordUrl = "/auth/change-password";

const Setting = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        mode: 'onBlur',
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const newPassword = watch("newPassword");

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosPrivate.put(changePasswordUrl, {
                currentPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Password changed successfully!");
            reset();
            onClose();
        },
        onError: (error) => {
            const message = error.response?.data?.message || error.message || "Failed to change password";
            toast.error(message);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div
                className="relative m-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                        <p className="text-sm text-gray-500 mt-1">For security, please do not share your password.</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-800 rounded-full"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-6">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <label htmlFor="oldPassword" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                Current Password
                            </label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="oldPassword"
                                    type={showOldPassword ? 'text' : 'password'}
                                    placeholder="Enter your current password"
                                    className={`w-full py-3 pl-11 pr-12 border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${errors.oldPassword ? 'border-red-500 focus:ring-4 focus:ring-red-50 focus:border-red-500' : 'border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'}`}
                                    {...register("oldPassword", { required: "Old Password is required" })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-2 text-gray-400 hover:text-indigo-600 h-9 w-9"
                                >
                                    {showOldPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </Button>
                            </div>
                            {errors.oldPassword && <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1  tracking-tighter">{errors.oldPassword.message}</p>}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                New Password
                            </label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    className={`w-full py-3 pl-11 pr-12 border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${errors.newPassword ? 'border-red-500 focus:ring-4 focus:ring-red-50 focus:border-red-500' : 'border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'}`}
                                    {...register("newPassword", {
                                        required: "New Password is required",
                                        minLength: { value: 5, message: "Password must be at least 5 characters" },
                                    })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 text-gray-400 hover:text-indigo-600 h-9 w-9"
                                >
                                    {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </Button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1 tracking-tighter">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                Confirm New Password
                            </label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-3.5 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Re-enter your new password"
                                    className={`w-full py-3 pl-11 pr-12 border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${errors.confirmPassword ? 'border-red-500 focus:ring-4 focus:ring-red-50 focus:border-red-500' : 'border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'}`}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === newPassword || "Passwords do not match",
                                    })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 text-gray-400 hover:text-indigo-600 h-9 w-9"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </Button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1 tracking-tighter">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="px-6 rounded-xl font-bold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={mutation.isPending}
                            className="px-8 rounded-xl font-extrabold shadow-lg shadow-indigo-100"
                        >
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Setting;
