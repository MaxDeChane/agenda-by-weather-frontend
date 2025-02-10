import WeatherForecast, {Period} from "@/domain/weather-forecast";
import {RefObject, useState} from "react";

export type GeneralWeatherViewInput = {
    readonly generalWeatherForecast: WeatherForecast | undefined;
    readonly hourlyWeatherPeriod: Period;
    readonly generalWeatherForecastPeriodIndexRef: RefObject<number>;
}

export default function GeneralWeatherView({generalWeatherForecast, hourlyWeatherPeriod, generalWeatherForecastPeriodIndexRef}: GeneralWeatherViewInput) {

    const [generalWeatherPeriod, setWeatherPeriod] = useState(() => {
        const generalWeatherPeriods = generalWeatherForecast?.properties.periods;
        if(generalWeatherPeriods && generalWeatherForecastPeriodIndexRef.current < generalWeatherPeriods.length) {
            let weatherPeriod = generalWeatherPeriods[generalWeatherForecastPeriodIndexRef.current];
            if (hourlyWeatherPeriod.startTime >= weatherPeriod.startTime) {
                ++generalWeatherForecastPeriodIndexRef.current;
                return weatherPeriod
            }
        }
    });

    return generalWeatherPeriod ? <div className="grid justify-items-center border-b">
            <p className="text-4xl">{generalWeatherPeriod.name}</p>
            <p className="text-2xl">{generalWeatherPeriod.shortForecast}</p>
            <p className="text-2xl">Temperature: {generalWeatherPeriod.temperature}&deg;{generalWeatherPeriod.temperatureUnit}</p>
            <p className="text-2xl">Wind Direction: {generalWeatherPeriod.windSpeed} {generalWeatherPeriod.windDirection}</p>
            <p className="text-2xl">Probability of Precipitation: {generalWeatherPeriod.probabilityOfPrecipitation.value}</p>
        </div>
    : <></>
}