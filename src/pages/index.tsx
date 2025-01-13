import "../app/globals.css";
import {useState} from "react";
import DateTimeService from "@/service/date-time-service";
import WeatherForecast from "@/domain/weather-forecast";
import HourlyView from "@/components/hourly-view";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export default function Index() {

    const [currentDate, setCurrentDate] = useState(dateTimeService.roundDateDownToDay(new Date()));
    const [forecastToDisplay, setForecastToDisplay] = useState(() => agendaWeatherDao.makeInitialRequest())

    return (
        <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
            <HourlyView forecastToDisplay={forecastToDisplay} />
        </div>
    );
}