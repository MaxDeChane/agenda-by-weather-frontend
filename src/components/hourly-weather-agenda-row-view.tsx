import {Period} from "@/domain/weather-forecast";
import {useContext} from "react";
import AgendaContext from "@/contexts/agenda-context";

export type HourlyWeatherAgendaRowViewInput = {
    weatherPeriod: Period;
    index: number;
}

export default function HourlyWeatherAgendaRowView({weatherPeriod, index}: HourlyWeatherAgendaRowViewInput) {
    return <div key={`ForecastDisplayRowDiv${index}`} className="grid grid-cols-[1fr_7fr] divide-x">
        <div className="grid justify-center">
            <p>{new Date(weatherPeriod.startTime).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</p>
            <p>{weatherPeriod.shortForecast}</p>
            <p>T: {weatherPeriod.temperature}&deg;{weatherPeriod.temperatureUnit}</p>
            <p>WD: {weatherPeriod.windSpeed} {weatherPeriod.windDirection}</p>
            <p>PoP: {weatherPeriod.probabilityOfPrecipitation.value}%</p>
        </div>
        <div>
            Agenda items to go here
        </div>
    </div>;
}