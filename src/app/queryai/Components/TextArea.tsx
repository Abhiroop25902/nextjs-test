'use client'
import React, {useEffect, useRef, useState} from "react";
import {Cog6ToothIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid";
import ApiKeyDialog from "@/app/queryai/Components/ApiKeyDialog";
import LockedSubmitIcon from "@/app/queryai/Components/LockedSubmitIcon";
import {ApiKeyDialogHandles} from "@/app/queryai/types";
import LocalStorageKeys from "@/constants/LocalStorageKeys";

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

    const dialogRef = useRef<ApiKeyDialogHandles>(null);

    function displayModal() {
        dialogRef.current?.showModal();
    }

    const {queryAiApiKey} = LocalStorageKeys
    const [queryAiApiKeyValue, setQueryAiApiKeyValue] = useState<string | null>(null);

    const updateQueryAiApiKey = (api_key: string) => {
        localStorage.setItem(queryAiApiKey, api_key);
        setQueryAiApiKeyValue(localStorage.getItem(queryAiApiKey));
    }

    useEffect(() => {
        setQueryAiApiKeyValue(localStorage.getItem(queryAiApiKey));
    }, [queryAiApiKey]);

    return <div
        className={`flex w-full border-2 border-transparent rounded-3xl focus-within:border-white focus-within:border-2 focus-within:border-solid focus-within:rounded-3xl`}>
         <textarea
             className={`flex-grow rounded-l-3xl resize-none p-4 max-h-40 focus-visible:outline-none`}
             onInput={autoResize}
             onChange={autoResize}
             ref={textAreaRef}/>
        <div className={`flex items-center rounded-r-3xl pr-3 space-x-0.5`} style={{backgroundColor: "field"}}>
            <Cog6ToothIcon className={`size-6`} onClick={displayModal}/>
            {
                queryAiApiKeyValue ?
                    <PaperAirplaneIcon className={`size-6`} onClick={handleInput}/> :
                    <LockedSubmitIcon/>
            }
        </div>
        <ApiKeyDialog ref={dialogRef} setApiKey={updateQueryAiApiKey} initialApiKeyValue={queryAiApiKeyValue}/>
    </div>
}