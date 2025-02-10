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
                        <button className="pl-1 text-blue-600 hover:text-blue-700 focus:outline-none">
                            {startDate.toLocaleDateString()}
                        </button>
                    </p>
                    {showStartDateSelection && (
                        <div className="absolute z-10 mt-2">
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
                        <button className="pl-1 text-blue-600 hover:text-blue-700 focus:outline-none">
                            {endDate.toLocaleDateString()}
                        </button>
                    </p>
                    {showEndDateSelection && (
                        <div className="absolute z-10 mt-2">
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
