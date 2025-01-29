import React, { useState } from 'react';
import {englishTimesIn15MinuteIncrements} from "@/service/date-time-service";

export default function TimeSelectionView() {
    const [selectedStartTime, setSelectedStartTime] = useState('12:00 AM');
    const [selectedEndTime, setSelectedEndTime] = useState('11:59 PM');

    const handleStartTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStartTime(event.target.value);
        console.log(`Selected start time is ${event.target.value}`);
    };

    const handleEndTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEndTime(event.target.value);
        console.log(`Selected end time is ${event.target.value}`);
    };

    const timeOptionsHandle = (isStartTime: boolean) => {
        const key = isStartTime ? 'agendaStartTime' : 'agendaEndTime';
        return englishTimesIn15MinuteIncrements.map((englishTime) => {
            return (
                <option key={key + englishTime} value={englishTime}>
                    {englishTime}
                </option>
            )
        })
    }

    return (
        <div className="flex w-full justify-evenly items-center">
            <div>
                <label htmlFor={'startTimeSelect'}>Start time:</label>
                <select id={'startTimeSelect'} value={selectedStartTime} onChange={handleStartTimeSelection}>
                    {timeOptionsHandle(true)}
                </select>
            </div>
            <div>
                <label htmlFor={'endTimeSelect'}>End time:</label>
                <select id={'endTimeSelect'} value={selectedEndTime} onChange={handleEndTimeSelection}>
                    {timeOptionsHandle(false)}
                </select>
            </div>
        </div>
    );
};
