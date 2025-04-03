'use client'
import React from "react";
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";

export default function TextArea() {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    function autoResize(event: React.FormEvent<HTMLTextAreaElement>) {
        event.currentTarget.style.height = "auto";
        event.currentTarget.style.height = event.currentTarget.scrollHeight + "px"; // Set to scroll height
    }

    function handleInput() {
        console.log(textAreaRef.current?.value);
        textAreaRef.current!.value = "";
    }


    return <div
        className={`flex w-full border-2 border-transparent rounded-3xl focus-within:border-white focus-within:border-2 focus-within:border-solid focus-within:rounded-3xl`}>
         <textarea
             className={`flex-grow rounded-l-3xl resize-none p-4 max-h-40 focus-visible:outline-none`}
             onInput={autoResize}
             onChange={autoResize}
             ref={textAreaRef}/>
        <div className={`flex items-center rounded-r-3xl pr-2`} style={{backgroundColor: "field"}}>
            <PaperAirplaneIcon className={`size-6 `} onClick={handleInput}/>
        </div>
    </div>
}