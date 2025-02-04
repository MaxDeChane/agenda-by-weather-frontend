import React, {useEffect, useState} from 'react';
import DateTimeService, {metricTimeAndTimeDisplayHolders} from "@/service/date-time-service";
import CalendarView from "@/components/calendar-view";

const dateTimeService = DateTimeService.instance;

export type TimeSelectionView = {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly setStartDate: (startDate: Date) => void;
    readonly setEndDate: (startDate: Date) => void;
}

export default function TimeSelectionView({startDate, endDate, setStartDate, setEndDate}: TimeSelectionView) {
    const [selectedStartTimeIndex, setSelectedStartTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(startDate));
    const [selectedEndTimeIndex, setSelectedEndTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(endDate));
    const [showStartDateSelection, setShowStartDateSelection] = useState(() => false);
    const [showEndDateSelection, setShowEndDateSelection] = useState(() => false);

    useEffect(() => {
        // Add this in the effect so the start date will always be before the end date.
        if(selectedEndTimeIndex <= selectedStartTimeIndex) {
            const clonedDate = new Date(startDate);
            clonedDate.setMinutes(clonedDate.getMinutes() + 30);
            setEndDate(clonedDate);
            setSelectedEndTimeIndex(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(clonedDate));
        }
    }, [selectedStartTimeIndex, selectedEndTimeIndex])

    const handleStartDateSelectionClicked = () => {
        setShowStartDateSelection(!showStartDateSelection);
    }

    const handleEndDateSelectionClicked = () => {
        setShowEndDateSelection(!showEndDateSelection);
    }

    const handleStartDateSelected = (selectedStartDate: Date) => {
        setStartDate(selectedStartDate);

        if(!dateTimeService.isFirstDateOnOrBeforeSecondDate(selectedStartDate, endDate)) {
            setEndDate(new Date(selectedStartDate));
        }

        setShowStartDateSelection(false);
    }

    const handleEndDateSelected = (selectedEndDate: Date) => {
        if(!dateTimeService.isFirstDateOnOrBeforeSecondDate(startDate, selectedEndDate)) {
            setStartDate(new Date(selectedEndDate));
        }

        setEndDate(selectedEndDate);
        setShowEndDateSelection(false);
    }

    const handleStartTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const startTimeIndex = Number(event.target.value);
        const clonedStartDate = new Date(startDate);
        clonedStartDate.setHours(metricTimeAndTimeDisplayHolders[startTimeIndex].hours);
        clonedStartDate.setMinutes(metricTimeAndTimeDisplayHolders[startTimeIndex].minutes);

        setSelectedStartTimeIndex(startTimeIndex);
        setStartDate(clonedStartDate);
    };

    const handleEndTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const endTimeIndex = Number(event.target.value);
        const clonedDate = new Date(endDate);
        clonedDate.setHours(metricTimeAndTimeDisplayHolders[endTimeIndex].hours);
        clonedDate.setMinutes(metricTimeAndTimeDisplayHolders[endTimeIndex].minutes);

        setSelectedEndTimeIndex(endTimeIndex);
        setEndDate(clonedDate);
    };

    const createTimeDisplayElements = (isStartTime: boolean) => {
        const key = isStartTime ? 'agendaStartTime' : 'agendaEndTime';

        return metricTimeAndTimeDisplayHolders.map((metricTimeAndTimeDisplayHolder, index) => {
            const displayTime = metricTimeAndTimeDisplayHolder.displayTime;
            return (
                <option key={key + displayTime} value={index}>
                    {displayTime}
                </option>
            )
        })
    }

    console.log(`This date is ${selectedStartTimeIndex}`)

    return (
        <>
            <div className="grid grid-cols-2 w-full">
                <div>
                    <p onClick={handleStartDateSelectionClicked}>Start date:<button className="pl-1">{startDate.toLocaleDateString()}</button></p>
                    {(showStartDateSelection) ? <div className="absolute"><CalendarView initialSelectedDate={startDate} daySelectedHandle={handleStartDateSelected} /></div> : <></>}
                </div>
                <div>
                    <p onClick={handleEndDateSelectionClicked}>End date:<button className="pl-1">{endDate.toLocaleDateString()}</button></p>
                    {(showEndDateSelection) ? <div className="absolute"><CalendarView initialSelectedDate={endDate} daySelectedHandle={handleEndDateSelected}/></div> : <></>}
                </div>
                <div>
                    <label htmlFor='startTimeSelect'>Start time:</label>
                    <select id='startTimeSelect' value={selectedStartTimeIndex}
                            onChange={handleStartTimeSelection} className="text-center text-black">
                        {createTimeDisplayElements(true)}
                    </select>
                </div>
                <div>
                    <label htmlFor='endTimeSelect'>End time:</label>
                    <select id='endTimeSelect' value={selectedEndTimeIndex} onChange={handleEndTimeSelection}
                            className="text-center text-black">
                        {createTimeDisplayElements(false)}
                    </select>
                </div>
            </div>
        </>
    );
};
