export type ConfirmDialogViewInput = {
    readonly message: string;
    readonly onConfirm: () => void
    readonly onCancel: () => void
}

export default function ConfirmDialogView({ message, onConfirm, onCancel }: ConfirmDialogViewInput) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">Confirm Action</h2>
            <p className="text-center text-gray-700 mb-6">{message}</p>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}