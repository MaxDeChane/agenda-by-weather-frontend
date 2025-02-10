// components/Header.tsx
'use client'; // Mark as a Client Component
import React, { useState } from 'react';
import AddAgendaView from "@/components/add-agenda-view";

export default function HeaderView() {
    // State to manage which modal is open
    const [openModal, setOpenModal] = useState<string | null>(null);

    // Function to close the modal
    const closeModal = () => setOpenModal(null);

    return (
        <header className="sticky top-0 h-[15vh] bg-gradient-to-l from-[#4A90E2] to-[#6BB9F0] border-b border-gray-200 flex flex-col justify-end">
            {/* Bottom section with clickable text elements */}
            <nav className="container mx-auto px-4 py-6 flex justify-between items-end">
                {/* Left-aligned logo or brand name */}
                <div className="text-lg font-semibold text-gray-800">Agenda By Weather</div>

                {/* Right-aligned navigation links */}
                <div className="flex space-x-6">
                    <button
                        onClick={() => setOpenModal('about')}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        About
                    </button>
                    <button
                        onClick={() => setOpenModal('addAgendaItem')}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Add Agenda Item
                    </button>
                    <button
                        onClick={() => setOpenModal('contact')}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Contact
                    </button>
                </div>
            </nav>

            {/* Modals */}
            {openModal === 'about' && (
                <Modal onClose={closeModal} title="About">
                    <p>This is the About modal content.</p>
                </Modal>
            )}

            {openModal === 'addAgendaItem' && (
                <Modal onClose={closeModal} title="Add Agenda Item">
                    <AddAgendaView closeModal={closeModal} />
                </Modal>
            )}

            {openModal === 'contact' && (
                <Modal onClose={closeModal} title="Contact">
                    <p>This is the Contact modal content.</p>
                </Modal>
            )}
        </header>
    );
};

// Reusable Modal Component
const Modal = ({onClose, title, children}: { onClose: () => void; title: string; children: React.ReactNode}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
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