import {JSX, useRef} from "react";
import Agenda from "@/domain/agenda";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    let elementToDisplay: JSX.Element | undefined;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties && hourlyWeatherForecast.properties.periods) {
        const generalWeatherPeriodsIndexRef = useRef(0);

        elementToDisplay = <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
                {hourlyWeatherForecast.properties.periods.map((weatherPeriod, index) => {
                    return <>
                        <GeneralWeatherView generalWeatherForecast={generalWeatherForecast} hourlyWeatherPeriod={weatherPeriod} generalWeatherForecastPeriodIndexRef={generalWeatherPeriodsIndexRef} />
                        <HourlyWeatherAgendaRowView weatherPeriod={weatherPeriod} index={index}/>
                    </>
                })}
        </div>
    }

    return elementToDisplay;
}