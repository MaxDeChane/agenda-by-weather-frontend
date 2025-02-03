import React, {useState} from "react";
import TimeSelectionView from "@/components/time-selection-view";
import DateTimeService from "@/service/date-time-service";

const dateTimeService = DateTimeService.instance;

export default function AddAgendaView() {

    const [startDate, setStartDate] = useState(() => dateTimeService.roundDateUpToFifteenMinuteInterval(new Date()));
    const [endDate, setEndDate] = useState(() => {
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 30);

        return endDate;
    });

    return (
        <div className="fixed top-1/2 left-1/3 w-1/3 flex flex-col justify-center items-center border bg-black">
            <h1>Add Agenda Item</h1>
            <TimeSelectionView startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        </div>
    )
}