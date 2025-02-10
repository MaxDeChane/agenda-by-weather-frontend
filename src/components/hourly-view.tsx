import React, {JSX, useContext, useEffect, useRef, useState} from "react";
import Agenda from "@/domain/agenda";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";
import AddAgendaView from "@/components/add-agenda-view";
import AgendaCrudContext from "@/contexts/AgendaCrudContext";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {

    const [agendaItems, setAgendaItems] = useState(() => {
        if(agenda.agendaItems) {
            return agenda.agendaItems;
        }

        return []
    });

    const generalWeatherPeriodsIndexRef = useRef(0);

    const {showAddAgendaItemView} = useContext(AgendaCrudContext);

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    let elementToDisplay: JSX.Element | undefined;

    const addAgendaItemView = showAddAgendaItemView ?
        <AddAgendaView agendaLatLon={agenda.latLon} agendaItems={agendaItems} setAgendaItems={setAgendaItems} />
        : <></>;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties && hourlyWeatherForecast.properties.periods) {
        generalWeatherPeriodsIndexRef.current = 0;
        elementToDisplay =
            <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
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

    return <>
            {addAgendaItemView}
            {elementToDisplay}
        </>
}