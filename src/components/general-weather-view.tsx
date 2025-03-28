import { Period } from "@/domain/weather-forecast";
import {RefObject, useContext, useEffect, useRef, useState} from "react";
import AgendaContext from "@/contexts/agenda-context";
import DateTimeService from "@/service/date-time-service";

export type GeneralWeatherViewInput = {
    readonly generalWeatherPeriods: Array<Period> | undefined;
    readonly hourlyWeatherPeriod: Period;
    readonly generalWeatherForecastPeriodIndexRef: RefObject<number>;
};

const dateTimeService = DateTimeService.instance;

export default function GeneralWeatherView({
                                               generalWeatherPeriods,
                                               hourlyWeatherPeriod,
                                               generalWeatherForecastPeriodIndexRef
                                           }: GeneralWeatherViewInput) {

    const periodToScrollToRef = useRef<HTMLDivElement>(null);
    const { agenda } = useContext(AgendaContext);

    // State for the selected weather period
    const [generalWeatherPeriod, setWeatherPeriod] = useState<Period | null>(null);

    useEffect(() => {
        if (!generalWeatherPeriods) return;

        let index = generalWeatherForecastPeriodIndexRef.current ?? 0;

        if (index < generalWeatherPeriods.length) {
            let weatherPeriod = generalWeatherPeriods[index];

            if (hourlyWeatherPeriod.startTime >= weatherPeriod.startTime) {
                generalWeatherForecastPeriodIndexRef.current = index + 1;
                setWeatherPeriod(weatherPeriod);
            }
        }
    }, []);

    // Once/if the general weather period is found check to see if
    // it is the current one and if so, scroll to it.
    useEffect(() => {
        if(periodToScrollToRef.current) {
            periodToScrollToRef.current.scrollIntoView(true);
        }
    }, [generalWeatherPeriod]);

    const currentDate = new Date();

    const isCurrentPeriod = generalWeatherPeriod &&
        dateTimeService.isFirstDateTimeOnOrBeforeSecondDateTime(generalWeatherPeriod.startTime, currentDate) &&
        dateTimeService.isFirstDateTimeBeforeSecondDateTime(currentDate, generalWeatherPeriod.endTime);

    // Filter agenda items within the selected period
    const agendaItemsInPeriod = generalWeatherPeriod
        ? agenda?.agendaItems.filter(
        (agendaItem) =>
            (agendaItem.startDateTime <= generalWeatherPeriod.startTime &&
            agendaItem.endDateTime >= generalWeatherPeriod.startTime) ||
            (agendaItem.startDateTime >= generalWeatherPeriod.startTime &&
                agendaItem.startDateTime <= generalWeatherPeriod.endTime)
    ) ?? []
        : [];

    return generalWeatherPeriod ? (
        <div ref={isCurrentPeriod ? periodToScrollToRef : null} className="grid justify-items-center border-b">
            {/* Weather Information */}
            <p className="text-4xl">{generalWeatherPeriod.name}</p>
            <p className="text-2xl">{generalWeatherPeriod.shortForecast}</p>
            <p className="text-2xl">
                Temperature: {generalWeatherPeriod.temperature}&deg;{generalWeatherPeriod.temperatureUnit}
            </p>
            <p className="text-2xl">
                Wind Direction: {generalWeatherPeriod.windSpeed} {generalWeatherPeriod.windDirection}
            </p>
            <p className="text-2xl">
                Probability of Precipitation: {generalWeatherPeriod.probabilityOfPrecipitation?.value ?? 0}%
            </p>

            {/* Agenda Items Section */}
            <div className="mt-4 w-full pt-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center">Agenda Items</h3>

                {agendaItemsInPeriod.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {agendaItemsInPeriod.map((item, idx) => (
                            <button
                                key={idx}
                                // onClick={() => setSelectedItemAndIndex({selectedItem: item, index: idx})}
                                className="px-4 pt-2 border-b-4 rounded-t-lg transition-all duration-200
                                   text-gray-700 bg-white border-gray-300 hover:bg-gray-200
                                   focus:border-blue-500 active:border-blue-700 shadow"
                            >
                                {item.name} <br />
                                ({item.startDateTime.toLocaleDateString()} {item.startDateTime.toLocaleTimeString()} -{" "}
                                {item.endDateTime.toLocaleDateString()} {item.endDateTime.toLocaleTimeString()})
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-500 mt-2">No agenda items for this time period.</p>
                )}
            </div>
        </div>

    ) : null;
}
