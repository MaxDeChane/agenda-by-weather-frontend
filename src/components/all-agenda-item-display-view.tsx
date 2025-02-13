import React, {useContext, useState} from "react";
import AgendaContext from "@/contexts/agenda-context";
import {AgendaItem} from "@/domain/agenda";
import AgendaItemFormView from "@/components/agenda-item-form-view";
import AgendaWeatherDao from "@/dao/agenda-weather-dao";
import {AgendaItemCrudStatusEnum} from "@/domain/agenda-item-crud-status-enum";
import ModalView from "@/components/modal-view";
import ConfirmDialogView from "@/components/confirm-dialog-view";

const agendaWeatherDao = AgendaWeatherDao.instance;

export type AllAgendaItemDisplayViewInput = {
    readonly closeModal: () => void;
}

export default function AllAgendaItemDisplayView({closeModal}: AllAgendaItemDisplayViewInput) {

    const [selectedItemAndIndex, setSelectedItemAndIndex] = useState<{selectedItem: AgendaItem, index: number} | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { agenda, setAgenda } = useContext(AgendaContext);

    // First off check that we have a agenda or agenda items to even work with.
    if(!agenda) {
        // TODO: add error when how that is handled gets added
        console.error("Agenda is null and that should not be the case here. Please investigate.");
        return <></>
    } else if(!agenda.agendaItems) {
        return <p>No agenda items found for agenda {agenda.latLon}. Please add some.</p>
    }

    const handleItemSelect = (selectedItem: AgendaItem) => {
        if(selectedItemAndIndex) {
            setSelectedItemAndIndex({selectedItem, index: selectedItemAndIndex.index})
        } else {
            console.error("Selected item doesn't exist here when it should.")
        }
    }

    const handleOnBack = () => {
        setSelectedItemAndIndex(null)
        setIsEditing(false);
    }

    const handleDeleteClicked = () => {
        setShowDeleteConfirmation(true);
    }

    const handleDeleteConfirmationCancel = () => {
        setShowDeleteConfirmation(false);
    }

    const handleDeleteConfirmed = () => {
        if (selectedItemAndIndex) {
            const selectedItem = selectedItemAndIndex.selectedItem;
            console.log(`Attempting to delete agenda item: ${selectedItem.name}`);
            agendaWeatherDao.deleteAgendaItem(agenda.latLon, selectedItem.name).then((agendaItemCrudStatusEnum) => {
                if(agendaItemCrudStatusEnum === AgendaItemCrudStatusEnum.DELETED) {
                    agenda.agendaItems.splice(selectedItemAndIndex.index, 1);
                    setAgenda({...agenda});
                    setSelectedItemAndIndex(null);
                    setIsEditing(false);
                    console.log(`Agenda item has been deleted.`);
                }
            });
        } else {
            console.error("Selected item doesn't exist here when it should.")
        }

        setShowDeleteConfirmation(false);
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (selectedItemAndIndex ?
            <AgendaItemFormView agendaItem={selectedItemAndIndex.selectedItem} setAgendaItem={handleItemSelect}
                                onSubmit={handleOnSubmit}>
                {showDeleteConfirmation &&
                    <ModalView onClose={handleDeleteConfirmationCancel} title="">
                        <ConfirmDialogView message="Are you sure you want to delete this item? This action cannot be undone!"
                                           onConfirm={handleDeleteConfirmed}
                                           onCancel={handleDeleteConfirmationCancel} />
                    </ModalView>
                }

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={handleOnBack}
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
                        onClick={handleDeleteClicked}
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
            <div className="relative h-[400px] flex flex-col">
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto space-y-4">
                    {agenda?.agendaItems.map((item, index) => (
                        <div
                            key={item.name}
                            onClick={() => setSelectedItemAndIndex({selectedItem: item, index})}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                            <h3 className="font-semibold">{item.name}</h3>
                            <p>
                                {item.startDateTime.toLocaleDateString()} - {item.endDateTime.toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Sticky Close button */}
                <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-md">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
    );
}