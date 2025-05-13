import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {RefObject, useImperativeHandle, useRef, useState} from "react";
import {ApiKeyDialogHandles, GCloudLocalData} from "@/app/queryai/types";
import DialogInput from "@/app/queryai/Components/DialogInput";

export default function ApiKeyDialog({ref, gCloudLocalData, setGCloudLocalData}: {
    ref: RefObject<ApiKeyDialogHandles>,
    gCloudLocalData: GCloudLocalData,
    setGCloudLocalData: (k: GCloudLocalData) => void
}) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        hideModal: () => setOpen(false),
        showModal: () => setOpen(true)
    }))

    const projectIdInputRef = useRef<HTMLInputElement>(null);
    const bigQueryApiKeyInputRef = useRef<HTMLInputElement>(null);
    const genLangApiKeyInputRef = useRef<HTMLInputElement>(null);

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
                        <div className="px-8 pt-6 pb-2">
                            <div className="sm:flex flex-col space-y-4">
                                <div>
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-400">
                                        Input Google Cloud Data
                                    </DialogTitle>
                                    <Description className="text-xs text-gray-500">This data is stored in <a
                                        className={`underline`}
                                        href={`https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage`}>LocalStorage</a> and
                                        not in cloud. Make sure that all these data are from a single Google Cloud
                                        Project</Description>
                                </div>
                                <div>
                                    <DialogInput
                                        labelString={`Google Cloud Project Key`}
                                        ref={projectIdInputRef}
                                        defaultValue={gCloudLocalData?.projectId ?? ""}
                                    >Get your Google Cloud Project Id by following <a
                                        href={"https://support.google.com/googleapi/answer/7014113?hl=en"}
                                        target={`_blank`}
                                        className={`underline`}>this link</a>. This will be used to call the
                                        BigQuery API and the Gemini API</DialogInput>
                                </div>
                                <div>
                                    <DialogInput
                                        labelString={`Generative Language API Key`}
                                        ref={genLangApiKeyInputRef}
                                        defaultValue={gCloudLocalData?.genLangApiKey ?? ""}
                                    >
                                        Get your Generative Language Api Key <a
                                        href={"https://aistudio.google.com/apikey"} target={`_blank`}
                                        className={`underline`}>here</a>. This will be used to communicate with
                                        Gemini API to enable LLM chat
                                    </DialogInput>
                                </div>
                                <div>
                                    <DialogInput
                                        labelString={`Big Query API Key`}
                                        ref={bigQueryApiKeyInputRef}
                                        defaultValue={gCloudLocalData?.bigQueryApiKey ?? ""}
                                    >Get your Big Query Api Key by following<a
                                        href={"https://onelinerhub.com/google-big-query/how-do-i-generate-a-google-bigquery-api-key"}
                                        target={`_blank`}
                                        className={`underline`}>this link</a>. This will be used to execute
                                        BigQuery SQL to fetch data for Gemini</DialogInput>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => {
                                    const newGCloudState: GCloudLocalData = {
                                        projectId: projectIdInputRef.current?.value,
                                        bigQueryApiKey: bigQueryApiKeyInputRef.current?.value,
                                        genLangApiKey: genLangApiKeyInputRef.current?.value
                                    };
                                    setGCloudLocalData(newGCloudState);
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