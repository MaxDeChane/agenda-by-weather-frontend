import {beforeEach, describe, expect, test} from "@jest/globals";
import DateTimeService from "@/service/date-time-service";

describe("DateTimeServiceTests", () => {
    const classUnderTest = DateTimeService.instance;

    let testDate: Date;
    let expectedDate: Date;

    beforeEach(() => {
        testDate = new Date();
        expectedDate = new Date();
    })

    describe("roundDateUpToFifteenMinuteInterval", () => {
        test("DateWithTimeSetTo1200AM_1215AM", () => {
            testDate.setHours(0, 0, 0, 0);
            expectedDate.setHours(0, 15, 0, 0);

            expect(classUnderTest.roundDateUpToFifteenMinuteInterval(testDate).toLocaleString())
                .toEqual(expectedDate.toLocaleString());
        })

        test("DateWithTimeSetTo1159pm_1200AM", () => {
            testDate.setHours(23, 59, 0, 0);
            const clonedExpectedDated = new Date(expectedDate);
            clonedExpectedDated.setDate(clonedExpectedDated.getDate() + 1);
            clonedExpectedDated.setHours(0, 0, 0, 0);

            expect(classUnderTest.roundDateUpToFifteenMinuteInterval(testDate).toLocaleString())
                .toEqual(clonedExpectedDated.toLocaleString());
        })
    })

    describe("isFirstDateOnOrBeforeSecondDate", () => {
        test("firstDateBeforeSecondDateByOneDay_True", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setDate(firstDate.getDate() - 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeTruthy();
        })

        test("firstDateBeforeSecondDateByOneMonth_True", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setMonth(firstDate.getMonth() - 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeTruthy();
        })

        test("firstDateBeforeSecondDateByOneYear_True", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setFullYear(firstDate.getFullYear() - 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeTruthy();
        })

        test("firstDateEqualToSecondDate_True", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeTruthy();
        })

        test("firstDateBeforeSecondDateByOneDay_False", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setDate(firstDate.getDate() + 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeFalsy();
        })

        test("firstDateBeforeSecondDateByOneMonth_False", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setMonth(firstDate.getMonth() + 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeFalsy();
        })

        test("firstDateBeforeSecondDateByOneYear_False", () => {
            const secondDate = testDate;
            const firstDate = new Date(testDate);
            firstDate.setFullYear(firstDate.getFullYear() + 1);

            expect(classUnderTest.isFirstDateOnOrBeforeSecondDate(firstDate, secondDate)).toBeFalsy();
        })
    })
})