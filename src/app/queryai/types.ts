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