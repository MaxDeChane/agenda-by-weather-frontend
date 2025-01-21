import {JSX, useState} from "react";
import Agenda from "@/domain/agenda";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {
    const [displayDetailedWeatherView, setDisplayDetailedWeatherView] = useState(false);

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    let elementToDisplay: JSX.Element | undefined;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties && hourlyWeatherForecast.properties.periods) {
        elementToDisplay = <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
                {(generalWeatherForecast && generalWeatherForecast.properties && generalWeatherForecast.properties.periods) ?
                    <div className="grid justify-items-center">
                        <p className="text-4xl">{generalWeatherForecast.properties.periods[0].name}</p>
                        <p className="text-2xl">{generalWeatherForecast.properties.periods[0].shortForecast}</p>
                        <p className="text-2xl">Temperature: {generalWeatherForecast.properties.periods[0].temperature}&deg;{generalWeatherForecast.properties.periods[0].temperatureUnit}</p>
                        <p className="text-2xl">Wind Direction: {generalWeatherForecast.properties.periods[0].windSpeed} {generalWeatherForecast.properties.periods[0].windDirection}</p>
                        <p className="text-2xl">Probability of Precipitation: {generalWeatherForecast.properties.periods[0].probabilityOfPrecipitation.value}</p>
                    </div>
                    :
                    <></>
                }
                {hourlyWeatherForecast.properties.periods.map((weatherPeriod, index) => {
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
                })}
        </div>
    }

    return elementToDisplay;
}