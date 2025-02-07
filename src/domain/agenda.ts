import WeatherForecast from "@/domain/weather-forecast";

export interface AgendaItem {
    readonly name: string;
    readonly startDateTime: Date;
    readonly endDateTime: Date;
}

export default interface Agenda {
    readonly latLon: string;
    readonly defaultAgenda: boolean;
    readonly agendaItems: Array<AgendaItem>;
    readonly hourlyWeatherForecast?: WeatherForecast;
    readonly generalWeatherForecast?: WeatherForecast;
}