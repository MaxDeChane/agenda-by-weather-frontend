import Agenda, {AgendaItem} from "@/domain/agenda";
import {AddAgendaItemStatusEnum} from "@/domain/add-agenda-item-status";

const fetch = require('fetch-retry')(global.fetch);

export interface AgendaWeatherRequest {
    readonly url: string
    readonly method: string
    readonly body?: any
}

export default class AgendaWeatherDao {

    private static readonly WEATHER_BASE_URL = 'http://localhost:8080/agenda-weather'
    private static _instance: AgendaWeatherDao = new AgendaWeatherDao();

    private constructor() {}

    static get instance() {
        return this._instance;
    }

    private async makeServiceRequest<Request extends AgendaWeatherRequest, T>(request: Request):Promise<T> {
        return fetch(request.url, {
            retries: 5,
            retryDelay: 10000,
            retryOn: [500, 503],
            method: request.method,
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: (request.body) ? JSON.stringify(request.body) : null
        })
            .then((response: any) => {
                if(!response.ok) {
                    throw {response}
                }

                return response.json()
            }).then((responseBody: any) => {
                return responseBody;
            })
            .catch((error: { response: { status: any; data: any; }; }) => {
                console.error('Network request failed:', error);

                // Check if the error has a response object
                if (error.response) {
                    console.error('HTTP status code:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else {
                    console.log("No response info");
                }
                return null;
            });
    }
    
    async makeInitialRequest(): Promise<Agenda> {
        return this.makeServiceRequest({url: AgendaWeatherDao.WEATHER_BASE_URL, method: 'Get'});
    }

    async updateLatLonOnDefaultAgendaByAddress(address: string): Promise<Agenda> {
        return this.makeServiceRequest({url: AgendaWeatherDao.WEATHER_BASE_URL + '/' + address, method: 'Put'});
    }

    async addAgendaItemToAgendaByLatLon(latLon: string, agendaItem: AgendaItem): Promise<AddAgendaItemStatusEnum> {
        return this.makeServiceRequest({url: AgendaWeatherDao.WEATHER_BASE_URL + '/agenda-item/' + latLon, method: 'Put', body: agendaItem});
    }
}