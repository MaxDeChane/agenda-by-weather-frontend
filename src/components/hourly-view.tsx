import React, {JSX, useContext, useRef} from "react";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";
import AgendaContext from "@/contexts/agenda-context";
import {Period} from "@/domain/weather-forecast";


export default function HourlyView() {

    const generalWeatherPeriodsIndexRef = useRef(0);
    const {agenda} = useContext(AgendaContext);

    // If no agenda set yet on the context then just return blank but should get here in that case so log it.
    if(!agenda) {
        console.error("No agenda set so this component shouldn't be called. Setting to empty for now but should investigate.")
        return <></>
    }

    console.log(`Agenda items are ${agenda.agendaItems}`)

    let hourlyWeatherForecast = new Array<Period>();
    let generalWeatherForecast = new Array<Period>();

    [...agenda.agendaDaysByDateString.values()].forEach(agenda => {
        hourlyWeatherForecast.push(...agenda.hourlyWeatherPeriods.values());
        generalWeatherForecast.push(...agenda.generalWeatherPeriods.values());
    });

    if (hourlyWeatherForecast) {
        generalWeatherPeriodsIndexRef.current = 0;

        return <div className="grid grid-flow-row divide-y">
                {hourlyWeatherForecast.map((weatherPeriod, index) => {
                    return <span key={`WeatherDisplayRowPeriod-${weatherPeriod.startTime}`}>
                        <GeneralWeatherView generalWeatherPeriods={generalWeatherForecast}
                                            hourlyWeatherPeriod={weatherPeriod}
                                            generalWeatherForecastPeriodIndexRef={generalWeatherPeriodsIndexRef}/>
                        <HourlyWeatherAgendaRowView weatherPeriod={weatherPeriod} index={index}>
                            <p>testholder</p>
                        </HourlyWeatherAgendaRowView>
                    </span>
                })}
            </div>
    }

    return <></>
}