import React, {useContext, useState} from "react";
import AgendaContext from "@/contexts/agenda-context";
import {AgendaItem} from "@/domain/agenda";
import AgendaItemFormView from "@/components/agenda-item-form-view";

export type AllAgendaItemDisplayViewInput = {
    readonly closeModal: () => void;
}

export default function AllAgendaItemDisplayView({closeModal}: AllAgendaItemDisplayViewInput) {
    const [selectedItem, setSelectedItem] = useState<AgendaItem | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const { agenda } = useContext(AgendaContext);

    // First off check that we have a agenda or agenda items to even work with.
    if(!agenda) {
        // TODO: add error when how that is handled gets added
        console.error("Agenda is null and that should not be the case here. Please investigate.");
        return <></>
    } else if(!agenda.agendaItems) {
        return <p>No agenda items found for agenda {agenda.latLon}. Please add some.</p>
    }

    const handleOnSubmitClicked = (event: React.FormEvent<HTMLFormElement>) => {

    }


    return (selectedItem ?
            <AgendaItemFormView agendaItem={selectedItem} setAgendaItem={setSelectedItem}
                                onSubmit={handleOnSubmitClicked}>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setSelectedItem(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        // onClick={onDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                    {isEditing ? (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </AgendaItemFormView>
            :
            <div className="h-[400px] overflow-y-auto space-y-4"> {/* Fixed height and scrollable */}
                {agenda?.agendaItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => setSelectedItem(item)}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                        <h3 className="font-semibold">{item.name}</h3>
                        <p>
                            {item.startDateTime.toLocaleDateString()} - {item.endDateTime.toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
    );
}