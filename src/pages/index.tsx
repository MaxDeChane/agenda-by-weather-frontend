import "../app/globals.css";
import {useState} from "react";
import DateTimeService from "@/service/date-time-service";
import WeatherForecast from "@/domain/weather-forecast";
import HourlyView from "@/components/hourly-view";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import UserInfoView from "@/components/user-info-view";

const dateTimeService = DateTimeService.instance;
const agendaWeatherDao = AgendaWeatherDao.instance;

export default function Index() {

    const [currentDate, setCurrentDate] = useState(dateTimeService.roundDateDownToDay(new Date()));
    const [agenda, setAgenda] = useState(() => agendaWeatherDao.makeInitialRequest())

    let componentToDisplay = (agenda.latLon) ? <HourlyView agenda={agenda} /> : <UserInfoView></UserInfoView>

    return (
        <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
            {componentToDisplay}
        </div>
    );
}