import {ChatMessage} from "@/app/queryai/types";
import {CpuChipIcon, UserIcon} from "@heroicons/react/24/solid";
import {MessageRole} from "@/app/queryai/enums";
import clsx from "clsx";

export default function ChatMessageView({chatMessage, className}: { chatMessage: ChatMessage, className?: string }) {
    return <div className={clsx(`flex flex-row space-x-2`, className)}>
        <div
            className={clsx(`size-6 bg-indigo-500 rounded-3xl flex items-center justify-center p-0.5`,
                chatMessage.role !== MessageRole.BOT ? `opacity-0` : ``)}>
            <CpuChipIcon className={`size-5`}/>
        </div>
        <div
            className={clsx(`flex-grow`, chatMessage.role === MessageRole.USER && `text-right`)}>{chatMessage.text}</div>
        <div
            className={clsx(`size-6 bg-indigo-500 rounded-3xl flex items-center justify-center p-0.5`,
                chatMessage.role !== MessageRole.USER ? `opacity-0` : ``)}>
            <UserIcon className={`size-5`}/>
        </div>
    </div>
}