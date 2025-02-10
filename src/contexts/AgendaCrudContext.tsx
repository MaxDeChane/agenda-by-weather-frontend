import {createContext} from "react";


const AgendaCrudContext = createContext({
    showAddAgendaItemView: false,
    setShowAddAgendaItemView: (showAddAgendaItemView: boolean) => console.warn("Nothing set here so check not an error!")
});

export default AgendaCrudContext;