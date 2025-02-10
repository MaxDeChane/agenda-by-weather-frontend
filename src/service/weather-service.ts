export default class WeatherService {
    private static _instance: WeatherService = new WeatherService();

    private constructor() {
    }

    static get instance() {
        return this._instance;
    }
}