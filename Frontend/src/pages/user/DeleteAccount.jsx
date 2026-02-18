import React, { useState } from "react";
import { ShieldAlert, X } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import Button from "../../components/ui/Button";
import axiosPrivate from "@/utils/axiosPrivate";

const deleteAccountUrl = '/auth/profile';

const DeleteAccount = ({ onClose }) => {
    const navigate = useNavigate();

    const confirmationText = "Delete my account";
    const [inputValue, setInputValue] = useState("");

    // ✅ React Query mutation for deleting account
    const mutation = useMutation({
        mutationFn: async () => {
            await axiosPrivate.delete(deleteAccountUrl);
        },
        onSuccess: () => {
            toast.success("Account deleted successfully");
            // Clear local storage and redirect
            localStorage.removeItem('token');
            navigate('/login');
            onClose();
        },
        onError: (error) => {
            const message = error.response?.data?.message || error.message || "Failed to delete account";
            toast.error(message);
        },
    });

    const isButtonDisabled = inputValue !== confirmationText;

    const handleDelete = (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            mutation.mutate();
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
            <div
                className="relative m-4 w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleDelete}>
                    {/* --- Modal Header --- */}
                    <div className="flex items-start gap-4 p-6 border-b border-gray-100">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50">
                            <ShieldAlert
                                className="h-7 w-7 text-red-600"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold text-gray-900">
                                Delete Account
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                This action cannot be undone. All your data will be permanently removed.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-800 p-2 rounded-full"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* --- Modal Body --- */}
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600">
                            To confirm, please type the phrase below:
                        </p>

                        <div className="w-full text-center py-3 px-4 rounded-xl bg-gray-50 border border-gray-100">
                            <code className="font-mono text-sm font-bold text-gray-800 tracking-wider">
                                {confirmationText}
                            </code>
                        </div>

                        <input
                            id="confirmation"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type the phrase here..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-red-50 focus:border-red-400 transition-all text-gray-900"
                            aria-label="Confirmation text input"
                        />
                    </div>

                    {/* --- Modal Footer --- */}
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
                            variant="danger"
                            disabled={isButtonDisabled}
                            isLoading={mutation.isPending}
                            className="px-6 rounded-xl font-extrabold shadow-lg shadow-red-100"
                        >
                            Delete My Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccount;
