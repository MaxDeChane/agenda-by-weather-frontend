import {JSX, useState} from "react";
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
    readonly daySelectedHandle: (selectDate: Date) => any;
}

export default function CalendarView() {
    const [selectedDate, setSelectedDate] = useState(() => new Date());

    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    const [selectedMonthName, selectedMonthDayAmount] = Object.entries(MonthNameAndDayAmount)[selectedMonth];

    const previousMonth = selectedMonth - 1;
    const previousMonthNameAndDayAmount = Object.entries(MonthNameAndDayAmount)[(previousMonth < 0) ? 11 : previousMonth];

    const weekdayFirstOfSelectedMonthLandsOn = new Date(selectedDate.getFullYear(), selectedMonth, 1).getDay();

    const handleMonthChange = (isBackButtonPress: boolean) => {
        if(isBackButtonPress) {
            setSelectedDate(dateTimeService.moveDateBackAMonth(selectedDate));
        } else {
            setSelectedDate(dateTimeService.moveDateForwardAMonth(selectedDate));
        }
    }

    const handleDaySelection = (dayIndex: number, isInPreviousMonth = false, isInNextMonth = false) => {
        if(isInPreviousMonth) {
            const updatedDate = dateTimeService.moveDateBackAMonth(selectedDate);
            updatedDate.setDate(dayIndex)
            setSelectedDate(updatedDate);
        } else if(isInNextMonth){

        } else {
            selectedDate.setDate(dayIndex);
            setSelectedDate(new Date(selectedDate));
        }
    }

    const dayElements: Array<JSX.Element> = [];

    // Count backwards filling in the beginning of the week that this month doesn't cover
    // with the days from the previous month.
    for(let i = weekdayFirstOfSelectedMonthLandsOn - 1; i >= 0; --i) {
        dayElements.push(
            <button key={`month${previousMonth}DayButton${i}`} onClick={() => handleDaySelection(previousMonthNameAndDayAmount[1] - i, true)} className="w-10 border">
                <p className="text-gray-600">{previousMonthNameAndDayAmount[1] - i}</p>
            </button>
        );
    }

    for (let i = 1; i <= selectedMonthDayAmount; ++i) {
        // Gray out the background of the currently selected day
        const dayButtonStyle = (selectedDay === i) ? "w-10 border bg-gray-600" : "w-10 border";
        dayElements.push(
            <button key={`month${selectedMonth}DayButton${i}`} onClick={() => handleDaySelection(i)} className={dayButtonStyle}>
                {i}
            </button>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full border">
                <button onClick={()=> handleMonthChange(true)}>&#11207;</button>
                <p className="basis-full text-center">{selectedMonthName}</p>
                <button onClick={()=> handleMonthChange(false)}>&#11208;</button>
            </div>
            <div className='grid grid-cols-7'>
                {dayElements}
            </div>
        </div>
    );
}