"use client"

import React, {useEffect, useState} from "react";
import AgendaContext, {AgendaContextInterface} from "@/contexts/agenda-context";
import HeaderView from "@/components/header-view";
import Agenda from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import {Period} from "@/domain/weather-forecast";
import DateTimeService from "@/service/date-time-service";

const agendaWeatherDao = AgendaWeatherDao.instance;
const dateTimeService = DateTimeService.instance;

export default function AgendaByWeatherLayout({children,}: { children: React.ReactNode}) {

    const [agenda, setAgenda] = useState<Agenda | null>(null)
    const [currentWeather, setCurrentWeather] = useState<Period | null>(null)

    // Effect to do only on initial load
    useEffect(() => {
        if(!agenda) {
            agendaWeatherDao.makeInitialRequest().then(agenda => {
                setAgenda(agenda);
                if(agenda.agendaDaysByDay) {
                    const currentDateTime = new Date();
                    const currentAgendaDay = agenda.agendaDaysByDay.get(dateTimeService.getDateStringFromDate(currentDateTime));
                    let period;
                    if(currentAgendaDay) {
                        for (const periodToCheck of currentAgendaDay.hourlyWeatherPeriods.values()) {
                            if (periodToCheck.startTime <= currentDateTime && periodToCheck.endTime >= currentDateTime) {
                                period = periodToCheck
                            }
                        }
                    }
                    setCurrentWeather(period ?? null)
                }
            })
        }
    }, [])

    return (
        <html lang="en">
        <body className="container mx-auto bg-gradient-to-l from-[#4A90E2] to-[#6BB9F0] overflow-y-hidden">
            <AgendaContext.Provider value={{agenda, setAgenda} as AgendaContextInterface}>
                <HeaderView currentWeather={currentWeather}/>
                <main>
                    {/* Since the header takes up 20vh worth of the screen set this one to 80 to avoid
                        scrolling items being behind the header and not working correctly with scroll to
                        functionality. */}
                    <div className="overflow-auto h-[80vh] bg-gray-400 text-black z-10">
                        {children}
                    </div>
                </main>
            </AgendaContext.Provider>
        </body>
        </html>
    )
}