import WeatherForecast, {weatherForecastFromRestFactory} from "@/domain/weather-forecast";

export interface AgendaItem {
    readonly name: string;
    readonly startDateTime: Date;
    readonly endDateTime: Date;
}

export default interface Agenda {
    readonly latLon: string;
    readonly defaultAgenda: boolean;
    readonly agendaItems: Array<AgendaItem>;
    readonly hourlyWeatherForecast: WeatherForecast | null;
    readonly generalWeatherForecast: WeatherForecast | null;
}

export const agendaFromRestFactory = (agenda: Agenda): Agenda => {
    const convertedGeneralWeatherForecast = weatherForecastFromRestFactory(agenda.generalWeatherForecast);
    const convertedHourlyWeatherForecast = weatherForecastFromRestFactory(agenda.hourlyWeatherForecast);

    if(agenda.agendaItems) {
        // Make the date actual Date objects and sort the agenda items before setting the agenda.
        const sortedAgendaItems = agenda.agendaItems
            .map((agendaItem) => {
                return {
                    ...agendaItem,
                    startDateTime: new Date(agendaItem.startDateTime),
                    endDateTime: new Date(agendaItem.endDateTime)
                }
            })
            .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

        return {...agenda, generalWeatherForecast: convertedGeneralWeatherForecast, hourlyWeatherForecast: convertedHourlyWeatherForecast, agendaItems: sortedAgendaItems};
    } else {
        // If agenda items is null or undefined then nothing to sort and just set the agenda
        return agenda;
    }
}