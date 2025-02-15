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

export const periodFromRestFactory = (period: Period): Period => {
    return {...period, startTime: new Date(period.startTime), endTime: new Date(period.endTime)}
}

export const dayPeriodsFromRestFactory = (dayPeriods: Map<string, Period>) => {
    return new Map<Date, Period>(Object.entries(dayPeriods)
        .sort(([date1, period1], [date2, period2]) => {
            return date1.localeCompare(date2);
        })
        .map(([time, period]) => {
            return [new Date(time), periodFromRestFactory(period as Period)];
        }));
}