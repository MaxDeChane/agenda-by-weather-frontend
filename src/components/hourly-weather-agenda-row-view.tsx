import {Period} from "@/domain/weather-forecast";
import React from "react";

export type HourlyWeatherAgendaRowViewInput = {
    weatherPeriod: Period;
    index: number;
    children: React.ReactNode
}

export default function HourlyWeatherAgendaRowView({weatherPeriod, index, children}: HourlyWeatherAgendaRowViewInput) {
    return <div key={`ForecastDisplayRowDiv${index}`} className="grid grid-cols-[1fr_7fr] divide-x">
        <div className="pl-1">
            <p>{new Date(weatherPeriod.startTime).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</p>
            <p>{weatherPeriod.shortForecast}</p>
            <p>T: {weatherPeriod.temperature}&deg;{weatherPeriod.temperatureUnit}</p>
            <p>WD: {weatherPeriod.windSpeed} {weatherPeriod.windDirection}</p>
            <p>PoP: {weatherPeriod.probabilityOfPrecipitation.value}%</p>
        </div>
        <div>
            {children}
        </div>
    </div>;
}