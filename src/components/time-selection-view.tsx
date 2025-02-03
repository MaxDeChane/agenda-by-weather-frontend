import React, {useEffect, useState} from 'react';
import DateTimeService, {timeDisplaysIn15MinuteIncrements} from "@/service/date-time-service";
import CalendarView from "@/components/calendar-view";

const dateTimeService = DateTimeService.instance;

export type TimeSelectionView = {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly setStartDate: (startDate: Date) => void;
    readonly setEndDate: (startDate: Date) => void;
}

export default function TimeSelectionView({startDate, endDate, setStartDate, setEndDate}: TimeSelectionView) {
    const [selectedStartTimeIndex, setSelectedStartTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(startDate));
    const [selectedEndTimeIndex, setSelectedEndTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(endDate));
    const [showStartDateSelection, setShowStartDateSelection] = useState(() => false);
    const [showEndDateSelection, setShowEndDateSelection] = useState(() => false);

    useEffect(() => {
        // Make sure the meeting start to end always goes in the right direction.
        // If not then at 2 to the start index for the end index to make sure they do.
        if(selectedStartTimeIndex <= selectedEndTimeIndex) {
            setSelectedEndTimeIndex(selectedStartTimeIndex + 2);
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
        setSelectedStartTimeIndex(Number(event.target.value));
        console.log(`Selected start time is ${event.target.value}`);
    };

    const handleEndTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEndTimeIndex(Number(event.target.value));
        console.log(`Selected end time is ${event.target.value}`);
    };

    const createTimeDisplayElements = (isStartTime: boolean) => {
        const key = isStartTime ? 'agendaStartTime' : 'agendaEndTime';

        return timeDisplaysIn15MinuteIncrements.map((englishTime, index) => {
            return (
                <option key={key + englishTime} value={index}>
                    {englishTime}
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
