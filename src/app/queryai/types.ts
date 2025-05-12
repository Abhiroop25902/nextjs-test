import {MessageRole} from "@/app/queryai/enums";

export type ApiKeyDialogHandles = {
    showModal: () => void;
    hideModal: () => void;
}

export type ChatMessage = {
    id: string,
    role: MessageRole,
    text: string,
    display: boolean
}

export type GCloudLocalData = Partial<{
    projectId: string,
    bigQueryApiKey: string,
    genLangApiKey: string
}>

export const GCloudLocalDataPossibleKeys = [`projectId`, `bigQueryApiKey`, `genLangApiKey`];