"use client"

import {ShieldCheckIcon} from "@heroicons/react/24/solid";
import React from "react";

export default function EmailVerified() {
    const [countDownValue, setCountDownValue] = React.useState<number>(5);

    setTimeout(() => {
        if (countDownValue === 1) {
            window.close();
        }

        if (countDownValue !== 1) {
            setCountDownValue(countDownValue - 1);
        }
    }, 1000)

    return (
        <div className={`grid flex-auto items-center justify-items-center`}>
            <div className={`flex items-center justify-center`}>
                <div className={`h-20 w-20`}>
                    <ShieldCheckIcon/>
                </div>
                <div>
                    <h1 className={`text-2xl`}>Email Successfully Verified</h1>
                    <p className={`text-xs`}>The page will close in {countDownValue} seconds..</p>
                </div>
            </div>
        </div>

    )
}

