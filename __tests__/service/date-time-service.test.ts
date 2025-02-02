import {describe, expect, test} from "@jest/globals";
import DateTimeService, {timeDisplaysIn15MinuteIncrements} from "@/service/date-time-service";

const dateTimeService = DateTimeService.instance;
const testDate = new Date();

describe("DateTimeServiceTests", () => {
    describe("retrieve15MinuteTimeDisplayIndexForDateRoundingUp", () => {
        test("DateWithTimeSetTo1200AM_Index0", () => {
            testDate.setHours(0, 0, 0, 0);
            expect(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(testDate))
                .toEqual(1);
        })

        test("DateWithTimeSetTo130PM_Index54", () => {
            testDate.setHours(13, 30, 0, 0);
            expect(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(testDate))
                .toEqual(55);
        })

        test("DateWithTimeSetTo1159AM_LastIndex", () => {
            testDate.setHours(11, 59, 0, 0);
            expect(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(testDate))
                .toEqual(48);
        })

        test("DateWithTimeSetTo1159PM_LastIndex", () => {
            testDate.setHours(23, 59, 0, 0);
            expect(dateTimeService.retrieve15MinuteTimeDisplayIndexForDateRoundingUp(testDate))
                .toEqual(timeDisplaysIn15MinuteIncrements.length - 1);
        })
    })
})