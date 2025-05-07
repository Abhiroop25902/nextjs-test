import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {RefObject, useImperativeHandle, useRef, useState} from "react";
import {ApiKeyDialogHandles} from "@/app/queryai/types";
import {Input} from "@nextui-org/input";

export default function ApiKeyDialog({ref, initialApiKeyValue, setApiKey}: {
    ref: RefObject<ApiKeyDialogHandles>,
    initialApiKeyValue: string | null,
    setApiKey: (k: string) => void
}) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        hideModal: () => setOpen(false),
        showModal: () => setOpen(true)
    }))

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Dialog className="relative z-10"
                open={open}
                onClose={() => {
                    setOpen(false);
                    return true;
                }}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-950/75  backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"

            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="px-8 pt-6">
                            <div className="sm:flex sm:items-start flex-col space-y-2">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-400">
                                    Input Google API Key
                                </DialogTitle>
                                <Input
                                    type={"password"}
                                    ref={inputRef}
                                    className={
                                        `rounded-lg border-none text-sm/6  focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25`
                                    }
                                    defaultValue={initialApiKeyValue || ""}
                                    readOnly={false}

                                />
                                <Description className="text-sm text-gray-500">Get your Api Key <a
                                    href={`https://aistudio.google.com/apikey`} target={`_blank`}
                                    className={`underline`}>here</a>. API key is saved locally on browser.</Description>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => {
                                    const newApiKey = inputRef.current?.value;
                                    if (newApiKey !== undefined) setApiKey(newApiKey);
                                    ref.current?.hideModal()
                                }}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                data-autofocus="true"
                                onClick={() => ref.current?.hideModal()}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}