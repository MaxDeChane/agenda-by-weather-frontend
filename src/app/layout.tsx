"use client"

import React, {useEffect, useState} from "react";
import AgendaContext, {AgendaContextInterface} from "@/contexts/agenda-context";
import HeaderView from "@/components/header-view";
import Agenda, {AgendaItem} from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";

const agendaWeatherDao = AgendaWeatherDao.instance;

export default function AgendaByWeatherLayout({children,}: { children: React.ReactNode}) {

    const [agenda, setAgenda] = useState<Agenda | null>(null)

    // Effect to do only on initial load
    useEffect(() => {
        if(!agenda) {
            agendaWeatherDao.makeInitialRequest().then(agenda => {
                // Make the date actual Date objects and sort the agenda items before setting the agenda.
                const sortedAgendaItems = agenda.agendaItems
                    .map((agendaItem) => {
                        return {
                            ...agendaItem,
                            startDateTime: new Date(agendaItem.startDateTime),
                            endDateTime: new Date(agendaItem.endDateTime)
                        }
                    })
                    .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

                setAgenda({...agenda, agendaItems: sortedAgendaItems});
            })
        }
    }, [])

    return (
        <html lang="en">
        <body>
            <AgendaContext.Provider value={{agenda, setAgenda} as AgendaContextInterface}>
                <HeaderView />
                <main className="bg-gray-400 text-black">
                    {children}
                </main>
            </AgendaContext.Provider>
        </body>
        </html>
    )
}