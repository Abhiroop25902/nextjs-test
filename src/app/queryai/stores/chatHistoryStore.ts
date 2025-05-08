import {create} from 'zustand'
import {ChatMessage} from "@/app/queryai/types";
import {MessageRole} from "@/app/queryai/enums";
import {v4 as uuidv4} from 'uuid';

interface ChatMassageState {
    chatHistory: Array<ChatMessage>
    pushMessage: (m: ChatMessage) => void
}

export const chatHistoryStore = create<ChatMassageState>((set) => ({
    //TODO: make this genAI generated
    chatHistory: [
        {
            id: uuidv4(),
            role: MessageRole.BOT,
            text: "Hi how are you?",
            display: true
        }
        , {
            id: uuidv4(),
            role: MessageRole.USER,
            // text: "I am fine, how are you?",
            text: "I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?I am fine, how are you?",

            display: true
        },
    ],
    pushMessage: (m) => {
        set(
            store =>
                ({
                    chatHistory: [...store.chatHistory, m]
                })
        )
    }
}));