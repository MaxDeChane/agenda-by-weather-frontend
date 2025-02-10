import {createContext} from "react";
import Agenda from "@/domain/agenda";

export interface AgendaContextInterface {
    agenda: Agenda | null;
    setAgenda: (agenda: Agenda) => void
}

const AgendaContext = createContext({agenda: null, setAgenda: ({}) => console.warn("Using Default setter so nothing done!! Check that this isn't an error.")} as AgendaContextInterface);

export default AgendaContext;