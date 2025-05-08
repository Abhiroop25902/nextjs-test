import ChatHistoryView from "@/app/queryai/Components/ChatHistoryView";
import TextArea from "@/app/queryai/Components/TextArea";

export default function Chat() {
    return (<div className={`flex flex-grow flex-col h-full p-2 justify-end`}>
        <ChatHistoryView/>
        <TextArea/>
    </div>)
}