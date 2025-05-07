"use client";

import CircularProgressBar from "@/app/Components/circularProgressBar";
import {useEffect, useState} from "react";
import LocalStorageKeys from "@/constants/LocalStorageKeys";


export default function CountComponent() {
    const {countLocalStorageKey} = LocalStorageKeys;
    
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const getInitialCount = () => {
            const storedCount = localStorage.getItem(countLocalStorageKey) ?? "0";

            return parseInt(storedCount);
        };

        setTimeout(() => {
            const initialCount = getInitialCount();

            setCount(initialCount);
        }, 2000);
    }, [countLocalStorageKey]);

    useEffect(() => {
        if (count != null) {
            localStorage.setItem(countLocalStorageKey, count.toString());
        }
    }, [count, countLocalStorageKey]);

    const incrementCount = function () {
        if (count != null) {
            setCount(count + 1);
        }
    };

    if (count === null) {
        return <CircularProgressBar heightWidth={50} strokeWidth={2.5}/>;
    }
    return (
        <>
            <p>You have clicked the button {count} times.</p>
            <button
                className="inline-flex items-center rounded-md bg-indigo-600
    px-3 py-2  font-semibold text-white hover:bg-indigo-500 
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={incrementCount}
            >
                Button
            </button>
        </>
    );
}
