"use client"

import React, {useEffect, useState} from "react";
import AgendaContext, {AgendaContextInterface} from "@/contexts/agenda-context";
import HeaderView from "@/components/header-view";
import Agenda, {agendaFromRestFactory} from "@/domain/agenda";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";

const agendaWeatherDao = AgendaWeatherDao.instance;

export default function AgendaByWeatherLayout({children,}: { children: React.ReactNode}) {

    const [agenda, setAgenda] = useState<Agenda | null>(null)

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
        <body className="container mx-auto bg-gradient-to-l from-[#4A90E2] to-[#6BB9F0]">
            <AgendaContext.Provider value={{agenda, setAgenda} as AgendaContextInterface}>
                <HeaderView />
                <main className="min-h-screen bg-gray-400 text-black">
                    {children}
                </main>
            </AgendaContext.Provider>
        </body>
        </html>
    )
}