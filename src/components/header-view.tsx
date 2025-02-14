// components/Header.tsx
'use client'; // Mark as a Client Component
import React, { useState } from 'react';
import AddAgendaView from "@/components/add-agenda-view";
import AllAgendaItemDisplayView from "@/components/all-agenda-item-display-view";
import ModalView from "@/components/modal-view";

export default function HeaderView() {
    // State to manage which modal is open
    const [openModal, setOpenModal] = useState<string | null>(null);

    // Function to close the modal
    const closeModal = () => setOpenModal(null);

    return (
        <header className="sticky top-0 h-[15vh] bg-gradient-to-l from-[#4A90E2] to-[#6BB9F0] border border-gray-200 flex flex-col justify-end">
            {/* Bottom section with clickable text elements */}
            <nav className="px-4 py-6 flex justify-between items-end">
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
                        onClick={() => setOpenModal('agendaItems')}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Agenda Items
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
                <ModalView onClose={closeModal} title="About">
                    <p>This is the About modal content.</p>
                </ModalView>
            )}

            {openModal === 'addAgendaItem' && (
                <ModalView onClose={closeModal} title="Add Agenda Item">
                    <AddAgendaView closeModal={closeModal} />
                </ModalView>
            )}

            {openModal === 'agendaItems' && (
                <ModalView onClose={closeModal} title="Agenda Items">
                    <AllAgendaItemDisplayView closeModal={closeModal} />
                </ModalView>
            )}

            {openModal === 'contact' && (
                <ModalView onClose={closeModal} title="Contact">
                    <p>This is the Contact modal content.</p>
                </ModalView>
            )}
        </header>
    );
};