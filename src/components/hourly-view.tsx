import WeatherForecast from "@/domain/weather-forecast";
import {JSX} from "react";
import Agenda from "@/domain/agenda";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {

    let forecastToDisplay = agenda.weatherForecast;

    let elementsToDisplay: JSX.Element[] = []
    if(forecastToDisplay && forecastToDisplay.properties && forecastToDisplay.properties.periods) {
        elementsToDisplay = forecastToDisplay.properties.periods.map((weatherPeriod, index) => {
            return <div key={`ForecastDisplayRowDiv${index}`} className="grid grid-cols-[1fr_7fr] divide-x">
                <div>
                    <p>{new Date(weatherPeriod.startTime).toLocaleTimeString('en-US')}</p>
                    <p>{weatherPeriod.shortForecast}</p>
                    <p>T: {weatherPeriod.temperature}&deg;{weatherPeriod.temperatureUnit}</p>
                    <p>WD: {weatherPeriod.windSpeed} {weatherPeriod.windDirection}</p>
                    <p>PoP: {weatherPeriod.probabilityOfPrecipitation.value}%</p>
                </div>
                <div>
                    Agenda items to go here
                </div>
            </div>;
        });
    }

    return elementsToDisplay;
}