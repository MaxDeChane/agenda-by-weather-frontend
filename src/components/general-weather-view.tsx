import WeatherForecast, {Period} from "@/domain/weather-forecast";
import {RefObject} from "react";

export type GeneralWeatherViewInput = {
    readonly generalWeatherForecast: WeatherForecast | undefined;
    readonly hourlyWeatherPeriod: Period;
    readonly generalWeatherForecastPeriodIndexRef: RefObject<number>;
}

export default function GeneralWeatherView({generalWeatherForecast, hourlyWeatherPeriod, generalWeatherForecastPeriodIndexRef}: GeneralWeatherViewInput) {
    const generalWeatherPeriods = generalWeatherForecast?.properties.periods;
    if(generalWeatherPeriods && generalWeatherForecastPeriodIndexRef.current < generalWeatherPeriods.length) {
        let generalWeatherPeriod = generalWeatherPeriods[generalWeatherForecastPeriodIndexRef.current];
        if (hourlyWeatherPeriod.startTime == generalWeatherPeriod.startTime) {
            ++generalWeatherForecastPeriodIndexRef.current;
            return <div className="grid justify-items-center">
                    <p className="text-4xl">{generalWeatherPeriod.name}</p>
                    <p className="text-2xl">{generalWeatherPeriod.shortForecast}</p>
                    <p className="text-2xl">Temperature: {generalWeatherPeriod.temperature}&deg;{generalWeatherPeriod.temperatureUnit}</p>
                    <p className="text-2xl">Wind Direction: {generalWeatherPeriod.windSpeed} {generalWeatherPeriod.windDirection}</p>
                    <p className="text-2xl">Probability of Precipitation: {generalWeatherPeriod.probabilityOfPrecipitation.value}</p>
                </div>
        }
    }

    return <></>
}