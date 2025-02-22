import {JSX, useEffect, useState} from "react";
import DateTimeService from "@/service/date-time-service";

const MonthNameAndDayAmount = {
    January: 31,
    February: 28, // 29 in leap years
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
} as const;

const dateTimeService = DateTimeService.instance;

export type CalendarViewInput = {
    readonly initialSelectedDate: Date;
    readonly daySelectedHandle: (selectDate: Date) => any;
}

export default function CalendarView({initialSelectedDate, daySelectedHandle}: CalendarViewInput) {
    const [selectedDate, setSelectedDate] = useState(() => initialSelectedDate);

    const handleMonthChange = (isBackButtonPress: boolean) => {
        if(isBackButtonPress) {
            setSelectedDate(dateTimeService.moveDateBackAMonth(selectedDate));
        } else {
            setSelectedDate(dateTimeService.moveDateForwardAMonth(selectedDate));
        }
    }

    const handleDaySelection = (dayIndex: number, isInPreviousMonth = false, isInNextMonth = false) => {
        let updatedDate: Date;
        if(isInPreviousMonth) {
            updatedDate = dateTimeService.moveDateBackAMonth(selectedDate);
        } else if(isInNextMonth){
            updatedDate = dateTimeService.moveDateForwardAMonth(selectedDate);
        } else {
            updatedDate = new Date(selectedDate);
        }

        updatedDate.setDate(dayIndex);
        setSelectedDate(updatedDate);

        daySelectedHandle(updatedDate);
    }

    const dayElements: Array<JSX.Element> = [];

    // Count backwards filling in the beginning of the week that this month doesn't cover
    // with the days from the previous month.
    const selectedMonth = selectedDate.getMonth();
    const previousMonth = (selectedMonth == 0) ? 11 : selectedMonth - 1;
    const previousMonthNameAndDayAmount = Object.entries(MonthNameAndDayAmount)[previousMonth];
    // TODO add code to take care of leap years
    const weekdayFirstOfSelectedMonthLandsOn = new Date(selectedDate.getFullYear(), selectedMonth, 1).getDay();
    for(let i = weekdayFirstOfSelectedMonthLandsOn - 1; i >= 0; --i) {
        dayElements.push(
            <button key={`month${previousMonth}DayButton${i}`} onClick={() => handleDaySelection(previousMonthNameAndDayAmount[1] - i, true)} className="border">
                <p className="text-gray-600">{previousMonthNameAndDayAmount[1] - i}</p>
            </button>
        );
    }

    const selectedDay = selectedDate.getDate();
    const [selectedMonthName, selectedMonthDayAmount] = Object.entries(MonthNameAndDayAmount)[selectedMonth];
    for (let i = 1; i <= selectedMonthDayAmount; ++i) {
        // Gray out the background of the currently selected day
        const dayButtonStyle = (selectedDay === i) ? "border bg-gray-600" : "border";
        dayElements.push(
            <button key={`month${selectedMonth}DayButton${i}`} onClick={() => handleDaySelection(i)} className={dayButtonStyle}>
                {i}
            </button>
        );
    }

    // Add in the first few days of the next month to round out the calendar week at the end of the month.
    const nextMonth = (selectedMonth == 11) ? 0 : selectedMonth + 1;
    // TODO add code to take care of leap years
    const daysLeftInLastWeekOfMonth = 7 -  new Date(selectedDate.getFullYear(), selectedMonth, selectedMonthDayAmount).getDay();
    for(let i = 1; i < daysLeftInLastWeekOfMonth; ++i) {
        dayElements.push(
            <button key={`month${nextMonth}DayButton${i}`} onClick={() => handleDaySelection(i, false, true)} className="border">
                <p className="text-gray-600">{i}</p>
            </button>
        );
    }

    return (
        <div className="flex flex-col min-w-80 min-h-52 items-center bg-white rounded-lg shadow-md overflow-hidden">
            {/* Month Navigation Header */}
            <div className="flex flex-row w-full border-b border-gray-200 p-4 bg-gray-50">
                <button
                    onClick={() => handleMonthChange(true)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    &#11207; {/* Left arrow */}
                </button>
                <p className="flex-1 text-center text-lg font-semibold text-gray-800">
                    {selectedMonthName}
                    <br/>
                    <span className="text-sm font-normal text-gray-600">{selectedDate.getFullYear()}</span>
                </p>
                <button
                    onClick={() => handleMonthChange(false)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    &#11208; {/* Right arrow */}
                </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 w-full p-4 gap-2">
                {dayElements}
            </div>
        </div>
    );
}