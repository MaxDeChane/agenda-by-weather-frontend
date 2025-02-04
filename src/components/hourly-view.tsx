import React, {JSX, useRef, useState} from "react";
import Agenda from "@/domain/agenda";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";
import AgendaItems from "@/domain/agenda-items-by-date";
import AddAgendaView from "@/components/add-agenda-view";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {

    const [showAddAgendaItemView, setShowAddAgendaItemView] = useState(false);
    const [agendaItems, setAgendaItems] = useState(() => new AgendaItems());

    const generalWeatherPeriodsIndexRef = useRef(0);

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    let elementToDisplay: JSX.Element | undefined;

    const addAgendaItemClicked = () => {
        setShowAddAgendaItemView(!showAddAgendaItemView);
    }

    const addAgendaItemView = showAddAgendaItemView ?
        <AddAgendaView agendaItems={agendaItems}
                       setAgendaItems={setAgendaItems}
                       setShowAddAgendaItemView={setShowAddAgendaItemView}/>
        : <></>;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties &&
        hourlyWeatherForecast.properties.periods) {
        generalWeatherPeriodsIndexRef.current = 0;
        elementToDisplay =
            <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
                {hourlyWeatherForecast.properties.periods.map((weatherPeriod, index) => {
                    return <>
                        <GeneralWeatherView generalWeatherForecast={generalWeatherForecast}
                                            hourlyWeatherPeriod={weatherPeriod}
                                            generalWeatherForecastPeriodIndexRef={generalWeatherPeriodsIndexRef}/>
                        <HourlyWeatherAgendaRowView weatherPeriod={weatherPeriod} index={index}/>
                    </>
                })}
            </div>
    }

    return <>
            <header className="sticky top-0 h-10 w-full bg-amber-400">
                <button onClick={addAgendaItemClicked} className="h-5 bg-black">Add New Agenda Item</button>
            </header>
            {addAgendaItemView}
            {elementToDisplay}
        </>
}