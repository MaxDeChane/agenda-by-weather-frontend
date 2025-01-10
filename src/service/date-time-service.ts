export default class DateTimeService {
    private static _instance: DateTimeService = new DateTimeService();

    private constructor() {}

    static get instance() {
        return this._instance;
    }

    getFormattedDate(date: Date): string {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    isDateToday(date: Date): boolean {
        const todaysDate = new Date()

        return this.areDatesEqualByDateOnly(todaysDate, date)
    }

    areDatesEqualByDateOnly(date: Date, otherDate: Date): boolean {
        return date.getFullYear() === otherDate.getFullYear() 
            && date.getMonth() === otherDate.getMonth()
            && date.getDate() === otherDate.getDate()
    }

    roundDateDownToDay(date: Date): Date {
        // Make sure to clone the date before operating on it as not to change the original
        const clonedDate = new Date(date)

        clonedDate.setHours(0)
        
        return this.roundDateDownToHour(clonedDate)
    }

    roundDateDownToHour(date: Date): Date {
        // Make sure to clone the date before operating on it as not to change the original
        const clonedDate = new Date(date)

        clonedDate.setMinutes(0);
        clonedDate.setSeconds(0);
        clonedDate.setMilliseconds(0);

        return clonedDate;
    }
}