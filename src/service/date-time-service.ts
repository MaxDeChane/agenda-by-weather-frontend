export const timeDisplaysIn15MinuteIncrements = Array(24)
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
            return `${displayHour}:${displayMinute} ${period}`;
        });
    })
    .flat();

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

        clonedDate.setHours(0, 0, 0, 0);
        
        return clonedDate;
    }

    roundDateDownToHour(date: Date): Date {
        // Make sure to clone the date before operating on it as not to change the original
        const clonedDate = new Date(date)

        clonedDate.setMinutes(0, 0, 0);

        return clonedDate;
    }

    roundDateDownToFifteenMinuteInterval(date: Date): Date {
        // Make sure to clone the date before operating on it as not to change the original
        const clonedDate = new Date(date)
        let minutes = clonedDate.getMinutes();
        clonedDate.setMinutes(minutes - minutes % 15, 0, 0);

        return clonedDate;
    }

    /*
    Moves the month back one and sets the day to the first of the month.
     */
    moveDateBackAMonth(date: Date): Date {
        const clonedDate = new Date(date)

        // If the passed in date is January then roll back the year as well.
        if(clonedDate.getMonth() == 0) {
            clonedDate.setFullYear(clonedDate.getFullYear() - 1, 11, 1);
        } else {
            clonedDate.setMonth(clonedDate.getMonth() - 1, 1);
        }

        return clonedDate;
    }

    /*
    Moves the month back one and sets the day to the first of the month.
     */
    moveDateForwardAMonth(date: Date): Date {
        const clonedDate = new Date(date)

        // If the passed in date is December then move the year forward as well.
        if(clonedDate.getMonth() == 11) {
            clonedDate.setFullYear(clonedDate.getFullYear() + 1, 0, 1);
        } else {
            clonedDate.setMonth(clonedDate.getMonth() + 1, 1);
        }

        return clonedDate;
    }

    /*
    Will round the minutes of the date forward to 15 minute increments except for anything
    past 11:45 PM which will be rounded down to 11:45PM.
     */
    retrieve15MinuteTimeDisplayIndexForDateRoundingUp(date: Date) {
        let minuteIndex;
        if(date.getMinutes() < 15) {
            minuteIndex = 1;
        } else if(date.getMinutes() < 30) {
            minuteIndex = 2;
        } else if(date.getMinutes() < 45) {
            minuteIndex = 3;
        } else if(date.getMinutes() === 0) {
            minuteIndex = 0;
        } else {
            minuteIndex = 4
        }

        let index = date.getHours() * 4 + minuteIndex;

        return (index < timeDisplaysIn15MinuteIncrements.length) ? index : timeDisplaysIn15MinuteIncrements.length - 1;
    }
}
