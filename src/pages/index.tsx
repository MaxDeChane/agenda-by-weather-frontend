import "../app/globals.css";
import {useState} from "react";
import DateTimeService from "@/service/date-time-service";

const dateTimeService = DateTimeService.instance;

export default function Index() {

    const [currentDate, setCurrentDate] = useState(dateTimeService.roundDateDownToDay(new Date()));

    return (
        <div className="grid grid-rows-[100px_1fr] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <div className="w-full text-center">
                The date is {dateTimeService.getFormattedDate(currentDate)}
            </div>
            <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-blue-600">
                More content will go here as well
            </div>
        </div>
    );
}