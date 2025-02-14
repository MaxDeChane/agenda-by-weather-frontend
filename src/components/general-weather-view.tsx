import WeatherForecast, { Period } from "@/domain/weather-forecast";
import { RefObject, useContext, useEffect, useState } from "react";
import AgendaContext from "@/contexts/agenda-context";

export type GeneralWeatherViewInput = {
    readonly generalWeatherForecast: WeatherForecast | null;
    readonly hourlyWeatherPeriod: Period;
    readonly generalWeatherForecastPeriodIndexRef: RefObject<number>;
};

export default function GeneralWeatherView({
                                               generalWeatherForecast,
                                               hourlyWeatherPeriod,
                                               generalWeatherForecastPeriodIndexRef,
                                           }: GeneralWeatherViewInput) {
    const { agenda } = useContext(AgendaContext);

    // State for the selected weather period
    const [generalWeatherPeriod, setWeatherPeriod] = useState<Period | null>(null);

    useEffect(() => {
        if (!generalWeatherForecast || !generalWeatherForecast.properties.periods) return;

        const periods = generalWeatherForecast.properties.periods;
        let index = generalWeatherForecastPeriodIndexRef.current ?? 0;

        if (index < periods.length) {
            let weatherPeriod = periods[index];

            if (hourlyWeatherPeriod.startTime >= weatherPeriod.startTime) {
                generalWeatherForecastPeriodIndexRef.current = index + 1;
                setWeatherPeriod(weatherPeriod);
            }
        }
    }, []);

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
        <div className="grid justify-items-center border-b">
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
