import React, {JSX, useContext, useRef} from "react";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";
import AgendaContext from "@/contexts/agenda-context";


export default function HourlyView() {

    const generalWeatherPeriodsIndexRef = useRef(0);
    const {agenda} = useContext(AgendaContext);

    // If no agenda set yet on the context then just return blank but should get here in that case so log it.
    if(!agenda) {
        console.error("No agenda set so this component shouldn't be called. Setting to empty for now but should investigate.")
        return <></>
    }

    console.log(`Agenda items are ${agenda.agendaItems}`)

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties && hourlyWeatherForecast.properties.periods) {
        generalWeatherPeriodsIndexRef.current = 0;

        return <div className="grid grid-flow-row min-h-screen divide-y">
                {hourlyWeatherForecast.properties.periods.map((weatherPeriod, index) => {
                    return <span key={`WeatherDisplayRowPeriod-${weatherPeriod.startTime}`}>
                        <GeneralWeatherView generalWeatherForecast={generalWeatherForecast}
                                            hourlyWeatherPeriod={weatherPeriod}
                                            generalWeatherForecastPeriodIndexRef={generalWeatherPeriodsIndexRef}/>
                        <HourlyWeatherAgendaRowView weatherPeriod={weatherPeriod} index={index}/>
                    </span>
                })}
            </div>
    }

    return <></>
}