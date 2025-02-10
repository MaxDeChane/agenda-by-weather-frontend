"use client"

import React, {useContext, useEffect, useState} from "react";
import AgendaContext, {AgendaContextInterface} from "@/contexts/agenda-context";
import HeaderView from "@/components/header-view";
import Agenda from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";

const agendaWeatherDao = AgendaWeatherDao.instance;

export default function AgendaByWeatherLayout({children,}: { children: React.ReactNode}) {

    const [agenda, setAgenda] = useState<Agenda | null>(null)

    const agendaContext = useContext(AgendaContext);

    // Effect to do only on initial load
    useEffect(() => {
        if(!agenda) {
            agendaWeatherDao.makeInitialRequest().then(agenda => {
                setAgenda(agenda);
            })
        }
    }, [])

    return (
        <html lang="en">
        <body>
            <AgendaContext.Provider value={{agenda, setAgenda} as AgendaContextInterface}>
                <HeaderView />
                <main>
                    {children}
                </main>
            </AgendaContext.Provider>
        </body>
        </html>
    )
}