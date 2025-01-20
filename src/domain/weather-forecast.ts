export default interface WeatherForecast {
    readonly type: 'Feature';
    readonly properties: Properties;
}

export interface Properties {
    generatedAt: string;
    updateTime: string;
    readonly periods: Array<Period>;
}

export interface Period {
    readonly number: number;
    readonly name: string;
    readonly startTime: string;
    readonly endTime: string;
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