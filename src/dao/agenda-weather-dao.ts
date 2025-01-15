import WeatherForecast from "@/domain/weather-forecast";
import Agenda from "@/domain/agenda";

export interface AgendaWeatherRequest {
    readonly url: string
    readonly method: string
    readonly body?: any
}

export default class AgendaWeatherDao {

    private static _instance: AgendaWeatherDao = new AgendaWeatherDao();

    private constructor() {}

    static get instance() {
        return this._instance;
    }
    
    makeInitialRequest(): Agenda {
      // TODO Just return harcoded value for now
      return {
        "latLon":"",
          "defaultAgenda":true,
          weatherForecast: {
            "@context": [
            "https://geojson.org/geojson-ld/geojson-context.jsonld",
            {
                "@version": "1.1",
                "wx": "https://api.weather.gov/ontology#",
                "geo": "http://www.opengis.net/ont/geosparql#",
                "unit": "http://codes.wmo.int/common/unit/",
                "@vocab": "https://api.weather.gov/ontology#"
            }
        ],
            "type": "Feature",
            "geometry": {
            "type": "Polygon",
                "coordinates": [
                [
                    [
                        -91.257199999999997,
                        44.465200000000003
                    ],
                    [
                        -91.256299999999996,
                        44.486600000000003
                    ],
                    [
                        -91.2864,
                        44.487200000000001
                    ],
                    [
                        -91.287199999999999,
                        44.465800000000002
                    ],
                    [
                        -91.257199999999997,
                        44.465200000000003
                    ]
                ]
            ]
        },
            "properties": {
            "units": "us",
                "forecastGenerator": "HourlyForecastGenerator",
                "generatedAt": "2025-01-08T22:24:27+00:00",
                "updateTime": "2025-01-08T21:14:02+00:00",
                "validTimes": "2025-01-08T15:00:00+00:00/P7DT13H",
                "elevation": {
                "unitCode": "wmoUnit:m",
                    "value": 305.10480000000001
            },
            "periods": [
                {
                    "number": 1,
                    "name": "",
                    "startTime": "2025-01-08T16:00:00-06:00",
                    "endTime": "2025-01-08T17:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 18,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 4
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.777777777777779
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 44
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 2,
                    "name": "",
                    "startTime": "2025-01-08T17:00:00-06:00",
                    "endTime": "2025-01-08T18:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 16,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 4
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 51
                    },
                    "windSpeed": "3 mph",
                    "windDirection": "SW",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 3,
                    "name": "",
                    "startTime": "2025-01-08T18:00:00-06:00",
                    "endTime": "2025-01-08T19:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 15,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 53
                    },
                    "windSpeed": "1 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 4,
                    "name": "",
                    "startTime": "2025-01-08T19:00:00-06:00",
                    "endTime": "2025-01-08T20:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 13,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 58
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 5,
                    "name": "",
                    "startTime": "2025-01-08T20:00:00-06:00",
                    "endTime": "2025-01-08T21:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 12,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 60
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 6,
                    "name": "",
                    "startTime": "2025-01-08T21:00:00-06:00",
                    "endTime": "2025-01-08T22:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 11,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 63
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 7,
                    "name": "",
                    "startTime": "2025-01-08T22:00:00-06:00",
                    "endTime": "2025-01-08T23:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 11,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 63
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 8,
                    "name": "",
                    "startTime": "2025-01-08T23:00:00-06:00",
                    "endTime": "2025-01-09T00:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 11,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -17.222222222222221
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 63
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 9,
                    "name": "",
                    "startTime": "2025-01-09T00:00:00-06:00",
                    "endTime": "2025-01-09T01:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 11,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -16.666666666666668
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 66
                    },
                    "windSpeed": "2 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 10,
                    "name": "",
                    "startTime": "2025-01-09T01:00:00-06:00",
                    "endTime": "2025-01-09T02:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -16.666666666666668
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 69
                    },
                    "windSpeed": "3 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 11,
                    "name": "",
                    "startTime": "2025-01-09T02:00:00-06:00",
                    "endTime": "2025-01-09T03:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -16.111111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 73
                    },
                    "windSpeed": "3 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 12,
                    "name": "",
                    "startTime": "2025-01-09T03:00:00-06:00",
                    "endTime": "2025-01-09T04:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -16.111111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 73
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 13,
                    "name": "",
                    "startTime": "2025-01-09T04:00:00-06:00",
                    "endTime": "2025-01-09T05:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -16.111111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 73
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 14,
                    "name": "",
                    "startTime": "2025-01-09T05:00:00-06:00",
                    "endTime": "2025-01-09T06:00:00-06:00",
                    "isDaytime": false,
                    "temperature": 9,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -15.555555555555555
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 80
                    },
                    "windSpeed": "5 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/night/sct?size=small",
                    "shortForecast": "Partly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 15,
                    "name": "",
                    "startTime": "2025-01-09T06:00:00-06:00",
                    "endTime": "2025-01-09T07:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 1
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -15
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 80
                    },
                    "windSpeed": "6 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 16,
                    "name": "",
                    "startTime": "2025-01-09T07:00:00-06:00",
                    "endTime": "2025-01-09T08:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 9,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 1
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -15
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 83
                    },
                    "windSpeed": "6 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 17,
                    "name": "",
                    "startTime": "2025-01-09T08:00:00-06:00",
                    "endTime": "2025-01-09T09:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 10,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -15
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 80
                    },
                    "windSpeed": "6 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 18,
                    "name": "",
                    "startTime": "2025-01-09T09:00:00-06:00",
                    "endTime": "2025-01-09T10:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 13,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 1
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -13.888888888888889
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 76
                    },
                    "windSpeed": "6 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 19,
                    "name": "",
                    "startTime": "2025-01-09T10:00:00-06:00",
                    "endTime": "2025-01-09T11:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 16,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 1
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -13.333333333333334
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 70
                    },
                    "windSpeed": "7 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/sct?size=small",
                    "shortForecast": "Mostly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 20,
                    "name": "",
                    "startTime": "2025-01-09T11:00:00-06:00",
                    "endTime": "2025-01-09T12:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 18,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 1
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -12.777777777777779
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 67
                    },
                    "windSpeed": "8 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/bkn?size=small",
                    "shortForecast": "Partly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 21,
                    "name": "",
                    "startTime": "2025-01-09T12:00:00-06:00",
                    "endTime": "2025-01-09T13:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 20,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 0
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -11.666666666666666
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 67
                    },
                    "windSpeed": "8 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/bkn?size=small",
                    "shortForecast": "Partly Sunny",
                    "detailedForecast": ""
                },
                {
                    "number": 22,
                    "name": "",
                    "startTime": "2025-01-09T13:00:00-06:00",
                    "endTime": "2025-01-09T14:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 22,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 4
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -11.111111111111111
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 65
                    },
                    "windSpeed": "8 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/bkn?size=small",
                    "shortForecast": "Mostly Cloudy",
                    "detailedForecast": ""
                },
                {
                    "number": 23,
                    "name": "",
                    "startTime": "2025-01-09T14:00:00-06:00",
                    "endTime": "2025-01-09T15:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 23,
                    "temperatureUnit": "F",
                    "temperatureTrend": "",
                    "probabilityOfPrecipitation": {
                        "unitCode": "wmoUnit:percent",
                        "value": 7
                    },
                    "dewpoint": {
                        "unitCode": "wmoUnit:degC",
                        "value": -10.555555555555555
                    },
                    "relativeHumidity": {
                        "unitCode": "wmoUnit:percent",
                        "value": 65
                    },
                    "windSpeed": "7 mph",
                    "windDirection": "S",
                    "icon": "https://api.weather.gov/icons/land/day/bkn?size=small",
                    "shortForecast": "Partly Sunny",
                    "detailedForecast": ""
                }]}}
    } as Agenda
    }
}