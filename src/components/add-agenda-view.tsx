import React, {useContext, useEffect, useState} from "react";
import TimeSelectionView from "@/components/time-selection-view";
import DateTimeService from "@/service/date-time-service";
import Agenda, {AgendaItem} from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import AgendaContext from "@/contexts/agenda-context";
import {AddAgendaItemStatusEnum} from "@/domain/add-agenda-item-status";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export type AddAgendaViewInput = {
    readonly closeModal: () => void;
}

export default function AddAgendaView({closeModal}: AddAgendaViewInput) {

    const [name, setName] = useState(() => "");
    const [startDate, setStartDate] = useState(() => dateTimeService.roundDateUpToFifteenMinuteInterval(new Date()));
    const [endDate, setEndDate] = useState(() => {
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 30);

        return endDate;
    });

    const {agenda, setAgenda} = useContext(AgendaContext);

    if(!agenda) {
        //TODO: add an error screen here
        return <></>
    }

    const handleAgendaNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleAddClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const agendaItem = {name: name, startDateTime: startDate, endDateTime: endDate} as AgendaItem;
        console.log(`Attempting to add agenda item: ${agendaItem}`);
        agendaWeatherDao.addAgendaItemToAgendaByLatLon(agenda.latLon, agendaItem).then((addAgendaItemStatusEnum) => {
            console.log(`Response from adding agenda item is: ${addAgendaItemStatusEnum}`);

            // TODO handle error cases here

            switch (addAgendaItemStatusEnum) {
                case AddAgendaItemStatusEnum.ADDED:
                    let updatedAgenda;
                    if(!agenda.agendaItems) {
                        updatedAgenda = {...agenda, agendaItems: [agendaItem]} as Agenda;
                    } else {
                        updatedAgenda = {...agenda} as Agenda;
                        updatedAgenda.agendaItems.push(agendaItem);
                        agenda.agendaItems.sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())
                    }

                    setAgenda(updatedAgenda);
                    closeModal();
                    break;
                default:
                    console.error(`Don't know how to handle the returned message!!! ${addAgendaItemStatusEnum}`)
            }
        });
    }

    return (
        <form onSubmit={handleAddClick} className="p-5 space-y-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            {/* Form Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Agenda Item</h1>

            {/* Agenda Item Name Input */}
            <div className="space-y-2">
                <label htmlFor="agendaNameInput" className="block text-sm font-medium text-gray-700">
                    Agenda Item Name:
                </label>
                <input
                    id="agendaNameInput"
                    type="text"
                    value={name}
                    onChange={handleAgendaNameInputChange}
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Time Selection Component */}
            <TimeSelectionView
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add
                </button>
            </div>
        </form>
    )
}