import {
    dayPeriodsFromRestFactory,
    Period
} from "@/domain/weather-forecast";

export interface AgendaItem {
    readonly name: string;
    readonly startDateTime: Date;
    readonly endDateTime: Date;
}

export interface AgendaDay {
    readonly generalWeatherPeriods: Map<Date, Period>;
    readonly hourlyWeatherPeriods: Map<Date, Period>;
}

export default interface Agenda {
    readonly latLon: string;
    readonly defaultAgenda: boolean;
    readonly agendaItems: Array<AgendaItem>;
    readonly agendaDaysByDay: Map<string, AgendaDay>
}

export const agendaFromRestFactory = (agenda: Agenda): Agenda => {
    const convertedAgendaDaysByString = agenda.agendaDaysByDay &&
        new Map<string, AgendaDay>(Object.entries(agenda.agendaDaysByDay)
            .sort(([date1, agendaDay1], [date2, agendaDay2]) => {
                return date1.localeCompare(date2);
            })
            .map(([date, agendaDay]) => {
                const convertedGeneralWeatherPeriods = dayPeriodsFromRestFactory(agendaDay.generalWeatherPeriods);
                const convertedHourlyWeatherForecast = dayPeriodsFromRestFactory(agendaDay.hourlyWeatherPeriods);

                return [date, {
                    generalWeatherPeriods: convertedGeneralWeatherPeriods,
                    hourlyWeatherPeriods: convertedHourlyWeatherForecast
                } as AgendaDay]
            }));

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

        return {...agenda, agendaDaysByDay: convertedAgendaDaysByString, agendaItems: sortedAgendaItems};
    } else {
        // If agenda items is null or undefined then nothing to sort and just set the agenda
        return agenda;
    }
}