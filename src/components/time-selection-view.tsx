import React, {useEffect, useRef, useState} from 'react';
import DateTimeService, {metricTimeAndTimeDisplayHolders} from "@/service/date-time-service";
import CalendarView from "@/components/calendar-view";

const dateTimeService = DateTimeService.instance;

export type TimeSelectionViewInput = {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly dateUpdateHandle:(startDateTime: Date, endDateTime: Date) => void;
}

export default function TimeSelectionView({startDate, endDate, dateUpdateHandle}: TimeSelectionViewInput) {
    const [selectedStartTimeIndex, setSelectedStartTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(startDate));
    const [selectedEndTimeIndex, setSelectedEndTimeIndex] = useState(() => dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(endDate));
    const [showStartDateSelection, setShowStartDateSelection] = useState(() => false);
    const [showEndDateSelection, setShowEndDateSelection] = useState(() => false);

    const calendarStartDivRef = useRef<HTMLDivElement>(null);
    const calendarEndDivRef = useRef<HTMLDivElement>(null);

    // Handle so clicks outside the calendar views close them.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside the referenced component
            if (calendarStartDivRef.current && !calendarStartDivRef.current.contains(event.target as Node)) {
                setShowStartDateSelection(false); // Hide the component
            } else if (calendarEndDivRef.current && !calendarEndDivRef.current.contains(event.target as Node)) {
                setShowEndDateSelection(false); // Hide the component
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Add this in the effect so the start date will always be before the end date.
        if(selectedEndTimeIndex <= selectedStartTimeIndex) {
            const newEndDate = new Date(startDate);
            newEndDate.setMinutes(newEndDate.getMinutes() + 30);
            // Set updated end date.
            dateUpdateHandle(startDate, newEndDate);
            setSelectedEndTimeIndex(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(newEndDate));
        }
    }, [selectedStartTimeIndex, selectedEndTimeIndex])

    const handleStartDateSelectionClicked = () => {
        setShowStartDateSelection(!showStartDateSelection);
    }

    const handleEndDateSelectionClicked = () => {
        setShowEndDateSelection(!showEndDateSelection);
    }

    const handleStartDateSelected = (selectedStartDate: Date) => {
        let updatedEndDateIfNeeded = endDate;
        if(!dateTimeService.isFirstDateOnOrBeforeSecondDate(selectedStartDate, endDate)) {
            updatedEndDateIfNeeded = new Date(selectedStartDate);
        }
        dateUpdateHandle(selectedStartDate, updatedEndDateIfNeeded);
        setShowStartDateSelection(false);
    }

    const handleEndDateSelected = (selectedEndDate: Date) => {
        let updatedStartDateIfNeeded = startDate;
        if(!dateTimeService.isFirstDateOnOrBeforeSecondDate(startDate, selectedEndDate)) {
            updatedStartDateIfNeeded = new Date(selectedEndDate);
        }

        dateUpdateHandle(updatedStartDateIfNeeded, selectedEndDate);
        setShowEndDateSelection(false);
    }

    const handleStartTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const startTimeIndex = Number(event.target.value);
        const clonedStartDate = new Date(startDate);
        clonedStartDate.setHours(metricTimeAndTimeDisplayHolders[startTimeIndex].hours);
        clonedStartDate.setMinutes(metricTimeAndTimeDisplayHolders[startTimeIndex].minutes);

        setSelectedStartTimeIndex(startTimeIndex);
        dateUpdateHandle(clonedStartDate, endDate);
    };

    const handleEndTimeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const endTimeIndex = Number(event.target.value);
        const clonedEndDate = new Date(endDate);
        clonedEndDate.setHours(metricTimeAndTimeDisplayHolders[endTimeIndex].hours);
        clonedEndDate.setMinutes(metricTimeAndTimeDisplayHolders[endTimeIndex].minutes);

        setSelectedEndTimeIndex(endTimeIndex);
        dateUpdateHandle(startDate, clonedEndDate);
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

    return (
        <>
            <div className="grid grid-cols-2 gap-4 w-full p-4 bg-white rounded-lg shadow-md">
                {/* Start Date Section */}
                <div className="space-y-2">
                    <p
                        onClick={handleStartDateSelectionClicked}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        Start date:
                        <span className="pl-1 text-blue-600 hover:text-blue-700 focus:outline-none">
                            {startDate.toLocaleDateString()}
                        </span>
                    </p>
                    {showStartDateSelection && (
                        <div ref={calendarStartDivRef} className="absolute z-10 mt-2">
                            <CalendarView
                                initialSelectedDate={startDate}
                                daySelectedHandle={handleStartDateSelected}
                            />
                        </div>
                    )}
                </div>

                {/* End Date Section */}
                <div className="space-y-2">
                    <p
                        onClick={handleEndDateSelectionClicked}
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        End date:
                        <span className="pl-1 text-blue-600 hover:text-blue-700 focus:outline-none">
                            {endDate.toLocaleDateString()}
                        </span>
                    </p>
                    {showEndDateSelection && (
                        <div ref={calendarEndDivRef} className="absolute z-10 mt-2">
                            <CalendarView
                                initialSelectedDate={endDate}
                                daySelectedHandle={handleEndDateSelected}
                            />
                        </div>
                    )}
                </div>

                {/* Start Time Section */}
                <div className="space-y-2">
                    <label htmlFor="startTimeSelect" className="block text-sm font-medium text-gray-700">
                        Start time:
                    </label>
                    <select
                        id="startTimeSelect"
                        value={selectedStartTimeIndex}
                        onChange={handleStartTimeSelection}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    >
                        {createTimeDisplayElements(true)}
                    </select>
                </div>

                {/* End Time Section */}
                <div className="space-y-2">
                    <label htmlFor="endTimeSelect" className="block text-sm font-medium text-gray-700">
                        End time:
                    </label>
                    <select
                        id="endTimeSelect"
                        value={selectedEndTimeIndex}
                        onChange={handleEndTimeSelection}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    >
                        {createTimeDisplayElements(false)}
                    </select>
                </div>
            </div>
        </>
    );
};
