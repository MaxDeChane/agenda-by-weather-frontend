export const englishTimesIn15MinuteIncrements = Array(25)
    .fill(0)
    .map((_, index) => {
        if (index === 0) {
            return '12:00 AM'
        }
        if(index === 24) {
            return '11:59 PM'
        }
        const hour = index;
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour === 12 ? 12 : hour % 12;

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
}