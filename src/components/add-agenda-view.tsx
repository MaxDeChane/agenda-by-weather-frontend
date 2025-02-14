import React, {useContext, useEffect, useState} from "react";
import DateTimeService from "@/service/date-time-service";
import Agenda, {AgendaItem} from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import AgendaContext from "@/contexts/agenda-context";
import {AgendaItemCrudStatusEnum} from "@/domain/agenda-item-crud-status-enum";
import AgendaItemFormView from "@/components/agenda-item-form-view";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export type AddAgendaViewInput = {
    readonly closeModal: () => void;
}

export default function AddAgendaView({closeModal}: AddAgendaViewInput) {

    const [newAgendaItem, setNewAgendaItem] = useState(() => {
        const name = ""
        const startDateTime = dateTimeService.roundDateUpToFifteenMinuteInterval(new Date());
        const endDateTime = new Date(startDateTime);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30);

        return {name, startDateTime, endDateTime} as AgendaItem
    })

    const {agenda, setAgenda} = useContext(AgendaContext);

    if(!agenda) {
        //TODO: add an error screen here
        return <></>
    }

    const handleAddClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(`Attempting to add agenda item: ${newAgendaItem}`);
        agendaWeatherDao.addAgendaItemToAgendaByLatLon(agenda.latLon, newAgendaItem).then((addAgendaItemStatusEnum) => {
            console.log(`Response from adding agenda item is: ${addAgendaItemStatusEnum}`);

            // TODO handle error cases here

            switch (addAgendaItemStatusEnum) {
                case AgendaItemCrudStatusEnum.ADDED:
                    let updatedAgenda;
                    if(!agenda.agendaItems) {
                        updatedAgenda = {...agenda, agendaItems: [newAgendaItem]} as Agenda;
                    } else {
                        updatedAgenda = {...agenda} as Agenda;
                        updatedAgenda.agendaItems.push(newAgendaItem);
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

    return <AgendaItemFormView disabled={false} agendaItem={newAgendaItem} setAgendaItem={setNewAgendaItem} onSubmit={handleAddClick}>
        {/* Buttons that will be different on the form based on whether adding new or editing and deleting.*/}
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
    </AgendaItemFormView>
}