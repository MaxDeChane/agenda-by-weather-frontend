import {JSX, useState} from "react";
import DateTimeService from "@/service/date-time-service";

const Months = {
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

    const [month, dayAmount] = Object.entries(Months)[selectedDate.getMonth()];
    const monthIndex = selectedDate.getMonth();
    const firstDayWeekdayNumber = new Date(selectedDate.getFullYear(), monthIndex, 1).getDay();
    const previousMonthIndex = monthIndex - 1;
    const previousMonthInfo = Object.entries(Months)[(previousMonthIndex < 0) ? 11 : previousMonthIndex];

    const handleMonthChange = (isBackButtonPress: boolean) => {
        if(isBackButtonPress) {
            setSelectedDate(dateTimeService.moveDateBackAMonth(selectedDate));
        } else {
            setSelectedDate(dateTimeService.moveDateForwardAMonth(selectedDate));
        }
    }

    const handleDaySelection = (dayIndex: number, ) => {

    }

    const dayElements: Array<JSX.Element> = [];

    for(let i = firstDayWeekdayNumber - 1; i >= 0; --i) {
        dayElements.push(<button onClick={() => handleDaySelection(i)} className="w-10 border">
            <p className="text-gray-600">{previousMonthInfo[1] - i}</p>
        </button>
    )
    }

    for (let i = 1; i <= dayAmount; ++i) {
        dayElements.push(<button key={`dayButton${i}`} className="w-10 border">
            {i}
        </button>)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full border">
                <button onClick={(event: any)=> handleMonthChange(true)}>&#11207;</button>
                <p className="basis-full text-center">{month}</p>
                <button onClick={(event: any)=> handleMonthChange(false)}>&#11208;</button>
            </div>
            <div className='grid grid-cols-7'>
                {dayElements}
            </div>
        </div>
    );
}