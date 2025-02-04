import React, {useState} from "react";
import TimeSelectionView from "@/components/time-selection-view";
import DateTimeService from "@/service/date-time-service";
import AgendaItems from "@/domain/agenda-items-by-date";

const dateTimeService = DateTimeService.instance;

export type AddAgendaViewInput = {
    readonly agendaItems: AgendaItems;
    readonly setAgendaItems: (agendaItems: AgendaItems) => void;
    readonly setShowAddAgendaItemView: (showAddAgendaItemView: boolean) => void
}

export default function AddAgendaView({agendaItems, setAgendaItems, setShowAddAgendaItemView}: AddAgendaViewInput) {

    const [startDate, setStartDate] = useState(() => dateTimeService.roundDateUpToFifteenMinuteInterval(new Date()));
    const [endDate, setEndDate] = useState(() => {
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 30);

        return endDate;
    });

    const handleAddClick = () => {
        console.log(`Start date is ${startDate} and End date is ${endDate}`);
    }

    return (
        <div className="fixed top-1/2 left-1/3 w-1/3 flex flex-col justify-center items-center border bg-black">
            <h1>Add Agenda Item</h1>
            <TimeSelectionView startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <div className="flex flex-row w-full">
                <button onClick={() => setShowAddAgendaItemView(false)} className="flex-1 border">Cancel</button>
                <button onClick={handleAddClick} className="flex-1 border">Add</button>
            </div>
        </div>
    )
}