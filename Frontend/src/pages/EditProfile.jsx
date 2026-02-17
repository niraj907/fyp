import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Camera } from "lucide-react";
import { toast } from "sonner";
import axiosPrivate from "@/utils/axiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/components/store/authStore";
import Button from "@/components/ui/Button";

const EditProfile = ({ onClose }) => {
    const { user } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    const [preview, setPreview] = useState(user?.image || null);
    const [selectedFile, setSelectedFile] = useState(null);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("name", data.name);

            // Only append image if a new one was selected
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const res = await axiosPrivate.put("/auth/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        },
        onSuccess: (data) => {
            // Update user in localStorage and auth store
            const updatedUser = {
                _id: data._id,
                name: data.name,
                email: data.email,
                image: data.image,
                role: data.role,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            useAuthStore.setState({ user: updatedUser });

            toast.success("Profile updated successfully!");
            onClose();
        },
        onError: (error) => {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update profile";
            toast.error(message);
        },
    });

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

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
                className="relative mx-4 w-full max-w-3xl rounded-2xl bg-slate-50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Modal Header --- */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Edit Profile
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Update your photo and personal details.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-800 p-2 rounded-full"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </Button>
                </div>

                {/* --- Modal Body & Form --- */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* --- Profile Picture Section --- */}
                            <div className="flex flex-col items-center md:items-start">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Photo
                                </label>
                                <div className="relative group">
                                    <img
                                        src={
                                            preview ||
                                            `https://ui-avatars.com/api/?name=${user?.name || "A"}&background=random&size=128`
                                        }
                                        alt={
                                            user?.name
                                                ? user.name.charAt(0).toUpperCase()
                                                : "A"
                                        }
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="text-white" size={32} />
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            {/* --- Form Fields Section --- */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Your full name"
                                            className={`mt-1 block w-full px-4 py-3 border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${errors.name
                                                    ? "border-red-500 focus:ring-4 focus:ring-red-50 focus:border-red-500"
                                                    : "border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                                                }`}
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1 tracking-tighter">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Input (read-only) */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="email"
                                            className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            disabled
                                            className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                                            {...register("email")}
                                        />
                                        <p className="text-gray-400 text-[11px] font-medium mt-1 ml-1">
                                            Email cannot be changed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Modal Footer --- */}
                    <div className="flex justify-end gap-3 p-6 bg-gray-100 border-t border-slate-200 rounded-b-2xl">
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
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;