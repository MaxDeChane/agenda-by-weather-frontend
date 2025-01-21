import WeatherForecast from "@/domain/weather-forecast";

export default interface Agenda {
    readonly latLon: string;
    readonly defaultAgenda: boolean;
    readonly hourlyWeatherForecast?: WeatherForecast;
    readonly generalWeatherForecast?: WeatherForecast;
}