import React from "react";

export default function CenterPanel({children, className}: { children: React.ReactNode, className?: string }) {

    return <div
        className={`flex items-center justify-center flex-grow bg-default-100 rounded-3xl ${className ?? ''}`}>{children}</div>;

}