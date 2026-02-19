import React, { useState } from 'react';
import { X } from '../../constants/icons';
import Button from '../ui/Button';

const confirmModel = ({
    onClose,
    onConfirm,
    title,
    message,
    buttonText,
    Icon,
    buttonColor,
    iconBgColor,
    iconColor
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            onConfirm();
            // setIsLoading(false); // Modal usually unmounts after onConfirm
        }, 1000);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[70]"
        // onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-[20px] shadow-2xl w-11/12 sm:w-[400px] relative border border-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full"
                    onClick={onClose}
                >
                    <X size={20} />
                </Button>

                {/* Icon inside circle */}
                {Icon && (
                    <div className="flex justify-center">
                        <div
                            className="p-4 rounded-full shadow-inner"
                            style={{ backgroundColor: iconBgColor }}
                        >
                            <Icon className="w-8 h-8" style={{ color: iconColor }} />
                        </div>
                    </div>
                )}

                {/* Title */}
                <h2 className="text-center text-xl font-bold mt-5 text-gray-800">{title}</h2>

                {/* Message */}
                <p className="text-center mt-3 text-gray-500 leading-relaxed px-2">{message}</p>

                {/* Buttons */}
                <div className="mt-8 flex items-center gap-3">
                    <Button
                        variant="secondary"
                        className="flex-1 rounded-xl"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        className="flex-1 rounded-xl"
                        style={buttonColor ? { backgroundColor: buttonColor } : {}}
                        onClick={handleConfirmClick}
                        isLoading={isLoading}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default confirmModel;
