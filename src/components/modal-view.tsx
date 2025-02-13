import React from "react";

export type ModalViewInput = {
    readonly onClose: () => void;
    readonly title: string;
    children: React.ReactNode
}

export default function ModalView ({onClose, title, children}: ModalViewInput) {
    return (
        <div className="fixed inset-0 max-h-[90vh] overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};