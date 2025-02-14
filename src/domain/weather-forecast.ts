import Agenda from "@/domain/agenda";

export default interface WeatherForecast {
    readonly type: 'Feature';
    readonly properties: Properties;
}

export interface Properties {
    generatedAt: Date;
    updateTime: Date;
    readonly periods: Array<Period>;
}

export interface Period {
    readonly number: number;
    readonly name: string;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly isDaytime: boolean;
    readonly temperature: number;
    readonly temperatureUnit: string;
    readonly temperatureTrend: 'rising' | 'falling' | 'steady' | 'unknown' | '';
    readonly probabilityOfPrecipitation: {
        readonly value: number;
        readonly unitCode: string;
    };
    readonly dewpoint: {
        readonly value: number;
        readonly unitCode: string;
    };
    readonly relativeHumidity: {
        readonly value: number;
        readonly unitCode: string;
    };
    readonly windSpeed: string
    readonly windDirection: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
    readonly shortForecast: string;
    readonly detailedForecast: string;
}

export const weatherForecastFromRestFactory = (weatherForecast: WeatherForecast | null): WeatherForecast | null => {
    if(weatherForecast) {
        const updatedProperties = propertiesFromRestFactory(weatherForecast.properties);
        if(updatedProperties) {
            return {...weatherForecast, properties: updatedProperties}
        }
    }

    return null;
}

export const propertiesFromRestFactory = (properties: Properties | undefined): Properties | null => {
    if(properties) {
        const updatedPeriods = properties.periods.map((period) => {
            return periodFromRestFactory(period);
        })

        if(updatedPeriods) {
            return {
                generatedAt: new Date(properties.generatedAt),
                updateTime: new Date(properties.updateTime),
                periods: updatedPeriods
            }
        }
    }

    return null;
}

export const periodFromRestFactory = (period: Period): Period => {
    return {...period, startTime: new Date(period.startTime), endTime: new Date(period.endTime)}
}