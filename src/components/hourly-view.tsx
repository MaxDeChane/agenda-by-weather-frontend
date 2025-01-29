import {JSX, useRef, useState} from "react";
import Agenda from "@/domain/agenda";
import HourlyWeatherAgendaRowView from "@/components/hourly-weather-agenda-row-view";
import GeneralWeatherView from "@/components/general-weather-view";
import TimeSelectionView from "@/components/time-selection-view";
import CalendarView from "@/components/calendar-view";

export type HourlyViewInput = {
    readonly agenda: Agenda;
}

export default function HourlyView({agenda}: HourlyViewInput) {

    const [showAddAgendaItemView, setShowAddAgendaItemView] = useState(false);
    const generalWeatherPeriodsIndexRef = useRef(0);

    let hourlyWeatherForecast = agenda.hourlyWeatherForecast;
    let generalWeatherForecast = agenda.generalWeatherForecast;

    let elementToDisplay: JSX.Element | undefined;

    const addAgendaItemClicked = () => {
        setShowAddAgendaItemView(!showAddAgendaItemView);
    }

    const agendaItemElement = showAddAgendaItemView ?
        <div className="fixed top-1/2 left-1/3 w-1/3 flex flex-col justify-center items-center border bg-black">
            <h1>Add Agenda Item</h1>
            <CalendarView monthIndex={1} />
            <TimeSelectionView />
        </div>
        : <></>;

    if (hourlyWeatherForecast && hourlyWeatherForecast.properties && hourlyWeatherForecast.properties.periods) {
        generalWeatherPeriodsIndexRef.current = 0;
        elementToDisplay = <div className="grid grid-flow-row min-h-screen divide-y font-[family-name:var(--font-geist-sans)]">
            {hourlyWeatherForecast.properties.periods.map((weatherPeriod, index) => {
                return <>
                    <GeneralWeatherView generalWeatherForecast={generalWeatherForecast} hourlyWeatherPeriod={weatherPeriod} generalWeatherForecastPeriodIndexRef={generalWeatherPeriodsIndexRef} />
                    <HourlyWeatherAgendaRowView weatherPeriod={weatherPeriod} index={index}/>
                </>
            })}
        </div>
    }

    return <>
        <header className="sticky top-0 h-10 w-full bg-amber-400">
            <button onClick={addAgendaItemClicked} className="h-5 bg-black">Add New Agenda Item</button>
        </header>
        {agendaItemElement}
        {elementToDisplay}
    </>
}