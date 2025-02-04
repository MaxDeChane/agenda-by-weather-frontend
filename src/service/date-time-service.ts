export interface MetricTimeAndTimeDisplayHolder {
    readonly hours: number;
    readonly minutes: number;
    readonly displayTime: string;
}

export const metricTimeAndTimeDisplayHolders = Array(24)
    .fill(0)
    .map((_, index) => {
        const hour = index;
        const period = hour < 12 ? 'AM' : 'PM';
        let displayHour = hour === 12 ? 12 : hour % 12;

        if(displayHour === 0) {
            displayHour = 12;
        }

        return Array(4).fill(0).map((_, index) => {
            const displayMinute = index == 0 ? '00' : 15 * index;
            return {hours: hour, minutes: displayMinute, displayTime: `${displayHour}:${displayMinute} ${period}`} as MetricTimeAndTimeDisplayHolder;
        });
    })
    .flat();

export default class DateTimeService {
    private static _instance: DateTimeService = new DateTimeService();

    private constructor() {}

    static get instance() {
        return this._instance;
    }

    roundDateDownToDay(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }

    roundDateUpToFifteenMinuteInterval(date: Date): Date {
        // Make sure to clone the date before operating on it as not to change the original
        const clonedDate = new Date(date)
        let minutes = clonedDate.getMinutes();
        clonedDate.setMinutes((minutes - minutes % 15) + 15, 0, 0);

        return clonedDate;
    }

    /*
    Moves the month back one and sets the day to the first of the month,
    but preserves the hours and minutes
     */
    moveDateBackAMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1,
            date.getHours(), date.getMinutes());
    }

    /*
    Moves the month forward one and sets the day to the first of the month,
    but preserves the hours and minutes
     */
    moveDateForwardAMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1,
            date.getHours(), date.getMinutes());
    }

    isFirstDateOnOrBeforeSecondDate(firstDate: Date, secondDate: Date): boolean {
        return firstDate.getFullYear() <= secondDate.getFullYear() &&
            firstDate.getMonth() <= secondDate.getMonth() &&
            firstDate.getDate() <= secondDate.getDate();
    }

    /*
    Will round the minutes of the date forward to 15 minute increments.
     */
    retrieve15MinuteTimeDisplayIndexForDateRoundingUp(date: Date) {
        let minuteIndex;
        if(date.getMinutes() < 15) {
            minuteIndex = 1;
        } else if(date.getMinutes() < 30) {
            minuteIndex = 2;
        } else if(date.getMinutes() < 45) {
            minuteIndex = 3;
        } else {
            minuteIndex = 4
        }

        let index = date.getHours() * 4 + minuteIndex;

        return (index < metricTimeAndTimeDisplayHolders.length) ? index : 1;
    }

    /*
    As the method says this method should only be called after the date has already been
    rounded to a 15 minute time otherwise the right index will most likely not be returned.
     */
    retrieve15MinuteTimeDisplayIndexForDateAfterItWasRounded(date: Date) {
        let minuteIndex;
        if(date.getMinutes() === 15) {
            minuteIndex = 1;
        } else if(date.getMinutes() === 30) {
            minuteIndex = 2;
        } else if(date.getMinutes() === 45) {
            minuteIndex = 3;
        } else {
            minuteIndex = 0
        }

        return date.getHours() * 4 + minuteIndex;
    }
}
