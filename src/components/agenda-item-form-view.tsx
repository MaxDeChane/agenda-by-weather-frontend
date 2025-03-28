import React, {useState} from "react";
import {AgendaItem} from "@/domain/agenda";
import TimeSelectionView from "@/components/time-selection-view";

export type AgendaItemFormViewInput = {
    readonly disabled: boolean;
    readonly agendaItem: AgendaItem;
    readonly setAgendaItem: (agendaItem: AgendaItem) => void
    readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    readonly children: React.ReactNode;
}

export default function AgendaItemFormView({disabled, agendaItem, setAgendaItem, onSubmit, children}: AgendaItemFormViewInput) {
    const [nameInvalid, setNameInvalid] = useState(false);

    const handleAgendaNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAgendaItem({...agendaItem, name: event.target.value});
    }

    const handleDateUpdate = (startDateTime: Date, endDateTime: Date) => {
        setAgendaItem({...agendaItem, startDateTime, endDateTime});
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if(!agendaItem.name || agendaItem.name === "") {
            event.preventDefault();
            setNameInvalid(true);
        } else {
            onSubmit(event);
        }
    }

    return <form onSubmit={handleOnSubmit} className="p-5 space-y-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {/* Agenda Item Name Input */}
        <fieldset disabled={disabled}>
            {nameInvalid && <p className="text-red-600">*Name is required.</p>}

            <div className="space-y-2">
                <label htmlFor="agendaNameInput" className="block text-sm font-medium text-gray-700">
                    Agenda Item Name:
                </label>
                <input
                    id="agendaNameInput"
                    type="text"
                    value={agendaItem.name}
                    onChange={handleAgendaNameInputChange}
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            {/* Time Selection Component */}
            <TimeSelectionView
                startDate={agendaItem.startDateTime}
                endDate={agendaItem.endDateTime}
                dateUpdateHandle={handleDateUpdate}
            />
        </fieldset>
        {children}
    </form>;
}