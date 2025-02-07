import React, {useState} from "react";
import TimeSelectionView from "@/components/time-selection-view";
import DateTimeService from "@/service/date-time-service";
import {AgendaItem} from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export type AddAgendaViewInput = {
    readonly agendaLatLon: string;
    readonly agendaItems: Array<AgendaItem>;
    readonly setAgendaItems: (agendaItems: Array<AgendaItem>) => void;
    readonly setShowAddAgendaItemView: (showAddAgendaItemView: boolean) => void
}

export default function AddAgendaView({agendaLatLon, agendaItems, setAgendaItems, setShowAddAgendaItemView}: AddAgendaViewInput) {

    const [name, setName] = useState(() => "");
    const [startDate, setStartDate] = useState(() => dateTimeService.roundDateUpToFifteenMinuteInterval(new Date()));
    const [endDate, setEndDate] = useState(() => {
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 30);

        return endDate;
    });

    const handleAgendaNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleAddClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const agendaItem = {name: name, startDateTime: startDate, endDateTime: endDate} as AgendaItem;
        console.log(`Attempting to add agenda item: ${agendaItem}`);
        agendaWeatherDao.addAgendaItemToAgendaByLatLon(agendaLatLon, agendaItem).then((addAgendaItemStatusEnum) => {
            console.log(`Response from adding agenda item is: ${addAgendaItemStatusEnum}`);
        });
    }

    return (
        <form onSubmit={handleAddClick} className="fixed top-1/4 left-1/3 w-1/3 flex flex-col justify-center items-center border bg-black">
            <h1>Add Agenda Item</h1>
            <label htmlFor="agendaNameInput">Agenda Item Name:</label>
            <input id="agendaNameInput" type="text" value={name} onChange={handleAgendaNameInputChange} placeholder="Name" className="text-black"/>
            <TimeSelectionView startDate={startDate} endDate={endDate} setStartDate={setStartDate}
                               setEndDate={setEndDate}/>
            <div className="flex flex-row w-full">
                <button onClick={() => setShowAddAgendaItemView(false)} className="flex-1 border">Cancel</button>
                <button type="submit" className="flex-1 border">Add</button>
            </div>
        </form>
    )
}