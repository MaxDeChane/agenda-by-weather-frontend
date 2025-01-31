import React, { useState } from 'react';
import {englishTimesIn15MinuteIncrements} from "@/service/date-time-service";
import CalendarView from "@/components/calendar-view";

export type TimeSelectionView = {
    readonly startDate: Date;
    readonly endDate: Date;
}

export default function TimeSelectionView({startDate, endDate}: TimeSelectionView) {
    const [selectedStartDate, setSelectedStartDate] = useState(() => startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(() => endDate);
    const [selectedStartEnglishTimeIndex, setSelectedStartEnglishTimeIndex] = useState(() => 0);
    const [selectedEndEnglishTimeIndex, setSelectedEndEnglishTimeIndex] = useState(() => englishTimesIn15MinuteIncrements.length - 1);
    const [showStartDateSelection, setShowStartDateSelection] = useState(() => false);
    const [showEndDateSelection, setShowEndDateSelection] = useState(() => false);

    const handleStartDateSelectionClicked = () => {
        setShowStartDateSelection(!showStartDateSelection);
    }

    const handleEndDateSelectionClicked = () => {
        setShowEndDateSelection(!showEndDateSelection);
    }

    const handleStartDateSelected = (selectedStartDate: Date) => {
        setSelectedStartDate(selectedStartDate);
        setShowStartDateSelection(false);
    }

    const handleEndDateSelected = (selectedEndDate: Date) => {
        setSelectedEndDate(selectedEndDate);
        setShowEndDateSelection(false);
    }

    const handleStartTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStartEnglishTimeIndex(Number(event.target.value));
        console.log(`Selected start time is ${event.target.value}`);
    };

    const handleEndTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEndEnglishTimeIndex(Number(event.target.value));
        console.log(`Selected end time is ${event.target.value}`);
    };

    const createTimeDisplayElements = (isStartTime: boolean) => {
        const key = isStartTime ? 'agendaStartTime' : 'agendaEndTime';

        return englishTimesIn15MinuteIncrements.map((englishTime, index) => {
            return (
                <option key={key + englishTime} value={index}>
                    {englishTime}
                </option>
            )
        })
    }

    console.log(`This date is ${selectedStartEnglishTimeIndex}`)

    return (
        <>
            <div className="grid grid-cols-2 w-full">
                <div>
                    <p onClick={handleStartDateSelectionClicked}>Start date:<span className="pl-1">{selectedStartDate.toLocaleDateString()}</span></p>
                    {(showStartDateSelection) ? <div className="absolute"><CalendarView initialSelectedDate={selectedStartDate} daySelectedHandle={handleStartDateSelected} /></div> : <></>}
                </div>
                <div>
                    <p onClick={handleEndDateSelectionClicked}>End date:<span className="pl-1">{selectedEndDate.toLocaleDateString()}</span></p>
                    {(showEndDateSelection) ? <div className="absolute"><CalendarView initialSelectedDate={selectedEndDate} daySelectedHandle={handleEndDateSelected}/></div> : <></>}
                </div>
                <div>
                    <label htmlFor='startTimeSelect'>Start time:</label>
                    <select id='startTimeSelect' value={selectedStartEnglishTimeIndex}
                            onChange={handleStartTimeSelection} className="text-center text-black">
                        {createTimeDisplayElements(true)}
                    </select>
                </div>
                <div>
                    <label htmlFor='endTimeSelect'>End time:</label>
                    <select id='endTimeSelect' value={selectedEndEnglishTimeIndex} onChange={handleEndTimeSelection}
                            className="text-center text-black">
                        {createTimeDisplayElements(false)}
                    </select>
                </div>
            </div>
        </>
    );
};
