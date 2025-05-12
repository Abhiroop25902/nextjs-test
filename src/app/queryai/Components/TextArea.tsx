'use client'
import React, {useEffect, useRef, useState} from "react";
import {Cog6ToothIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid";
import ApiKeyDialog from "@/app/queryai/Components/ApiKeyDialog";
import LockedSubmitIcon from "@/app/queryai/Components/LockedSubmitIcon";
import {ApiKeyDialogHandles, ChatMessage, GCloudLocalData, GCloudLocalDataPossibleKeys} from "@/app/queryai/types";
import LocalStorageKeys from "@/app/constants/LocalStorageKeys";
import {chatHistoryStore} from "@/app/queryai/stores/chatHistoryStore";
import {MessageRole} from "@/app/queryai/enums";
import {v4 as uuidv4} from 'uuid';
import {chartOptionStore} from "@/app/queryai/stores/chartOptionStore";
import Highcharts from "highcharts";

export default function TextArea() {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    function autoResize(event: React.FormEvent<HTMLTextAreaElement>) {
        event.currentTarget.style.height = "auto";
        event.currentTarget.style.height = event.currentTarget.scrollHeight + "px"; // Set to scroll height
    }

    const pushMessage = chatHistoryStore(store => store.pushMessage);
    const updateChartOption = chartOptionStore(store => store.updateChartOption)

    function handleInput() {
        const messageText = textAreaRef.current?.value

        if (messageText) {
            const message: ChatMessage = {
                role: MessageRole.USER,
                text: messageText,
                display: true,
                id: uuidv4()
            }

            pushMessage(message);
            //todo: remove it after adding detection part
            const chartComponentOptions: Highcharts.Options = {
                chart: {
                    type: 'line',
                    renderTo: 'container',
                    backgroundColor: '#00000000', // Dark background
                },
                title: {
                    text: 'Sample Highcharts Execution',
                    style: {color: '#FFFFFF'}, // White title
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    labels: {style: {color: '#FFFFFF'}}, // White labels
                },
                yAxis: {
                    title: {
                        text: 'Values',
                        style: {color: '#FFFFFF'}, // White labels
                    },
                    labels: {style: {color: '#FFFFFF'}},
                },
                series: [
                    {
                        name: 'Example Series',
                        type: 'line',
                        data: [10, 20, 30, 40, 50],
                        color: '#FFCC00', // Bright color for visibility
                    },
                ],
                legend: {
                    itemStyle: {color: '#FFFFFF'}, // White legend text
                },
            };
            updateChartOption(chartComponentOptions)
        }

        textAreaRef.current!.value = "";
    }

    const dialogRef = useRef<ApiKeyDialogHandles>(null);

    function displayModal() {
        dialogRef.current?.showModal();
    }

    const [gCloudLocalData, setGCloudLocalData] = useState<GCloudLocalData>({});

    const updateGCloudLocalData = (gCloudLocalData: GCloudLocalData) => {
        Object.entries(gCloudLocalData).forEach(([key, value]) => {
            if (value) localStorage.setItem(LocalStorageKeys[key], value);
            else localStorage.removeItem(LocalStorageKeys[key]);
        })

        setGCloudLocalData(
            GCloudLocalDataPossibleKeys.reduce<GCloudLocalData>((currObj, key) => {
                currObj[key as keyof GCloudLocalData] = localStorage.getItem(LocalStorageKeys[key]) ?? undefined;
                return currObj;
            }, {})
        );
    }

    useEffect(() => {
        setGCloudLocalData(
            GCloudLocalDataPossibleKeys.reduce<GCloudLocalData>((currObj, key) => {
                currObj[key as keyof GCloudLocalData] = localStorage.getItem(LocalStorageKeys[key]) ?? undefined;
                return currObj;
            }, {})
        );
    }, []);

    const allGCloudKeysPresent = () => {
        return GCloudLocalDataPossibleKeys.reduce((currState, key) => {
            return currState && !!gCloudLocalData[LocalStorageKeys[key] as keyof GCloudLocalData]
        }, true)
    }

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
                allGCloudKeysPresent() ?
                    <PaperAirplaneIcon className={`size-6`} onClick={handleInput}/> :
                    <LockedSubmitIcon/>
            }
        </div>
        <ApiKeyDialog ref={dialogRef} setGCloudLocalData={updateGCloudLocalData} gCloudLocalData={gCloudLocalData}/>
    </div>
}