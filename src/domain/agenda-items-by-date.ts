export interface AgendaItem {
    readonly startDateTime: Date;
    readonly endDateTime: Date;
}

export default class AgendaItems {

    constructor(private agendaItemsByStartDate = new Map<string, Array<AgendaItem>>()) {}

    addAgendaItem(agendaItem: AgendaItem) {
        let agendaItemsOnStartDate = this.agendaItemsByStartDate.get(agendaItem.startDateTime.toDateString());

        if(!agendaItemsOnStartDate) {
            agendaItemsOnStartDate = [];
        }

        agendaItemsOnStartDate.push(agendaItem);
    }
}