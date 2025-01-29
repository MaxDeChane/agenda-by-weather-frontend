import {JSX} from "react";

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

export type CalendarViewInput = {
    readonly monthIndex: number;
}

export default function CalendarView({monthIndex}: CalendarViewInput) {
    const [month, dayAmount] = Object.entries(Months)[monthIndex];

    const currentDate = new Date();
    const firstDayWeekdayNumber = new Date(currentDate.getFullYear(), monthIndex, 1).getDay();
    const previousMonthIndex = monthIndex - 1;
    const [previousMonth, previousMonthDayCount] = Object.entries(Months)[(previousMonthIndex < 0) ? 12 : previousMonthIndex];

    const dayElements: Array<JSX.Element> = [];

    for(let i = firstDayWeekdayNumber - 1; i >= 0; --i) {
        dayElements.push(<button className="w-10 border">
            {previousMonthDayCount - i}
        </button>)
    }

    for (let i = 1; i <= dayAmount; ++i) {
        dayElements.push(<button className="w-10 border">
            {i}
        </button>)
    }

    return (
        <div className="flex flex-col items-center">
            <p>{month}</p>
            <div className='grid grid-cols-7'>
                {dayElements}
            </div>
        </div>
    );
}