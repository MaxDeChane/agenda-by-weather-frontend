"use client"

import React, {useEffect, useState} from "react";
import AgendaCrudContext from "@/contexts/AgendaCrudContext";

export default function AgendaByWeatherLayout({children,}: { children: React.ReactNode}) {
    const [showAddAgendaItemView, setShowAddAgendaItemView] = useState(false);

    const handleAddAgendaItemClicked = () => {
        if(!showAddAgendaItemView) {
            setShowAddAgendaItemView(true);
        }
    }

    return (
        <html lang="en">
        <body>
            <header className="sticky top-0 h-10 w-full bg-amber-400">
                <button onClick={handleAddAgendaItemClicked} className="h-5 bg-black">Add New Agenda Item</button>
            </header>
            <main>
                <AgendaCrudContext.Provider value={{showAddAgendaItemView, setShowAddAgendaItemView}}>
                    {children}
                </AgendaCrudContext.Provider>
            </main>
        </body>
        </html>
    )
}