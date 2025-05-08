"use client"
import ChatMessageView from "@/app/queryai/Components/ChatMessageView";
import {chatHistoryStore} from "@/app/queryai/stores/chatHistoryStore";

export default function ChatHistoryView() {
    const chatHistory = chatHistoryStore(s => s.chatHistory)

    return <div className={`flex flex-col-reverse overflow-y-auto flex-grow max-h-full h-0 gap-4`}>
        {
            chatHistory.toReversed().map(chatMessage =>
                <ChatMessageView key={chatMessage.id} chatMessage={chatMessage}/>)
        }
    </div>;
}