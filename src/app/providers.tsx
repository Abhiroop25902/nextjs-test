// app/providers.tsx

import {NextUIProvider} from "@nextui-org/system";
import {ReactNode} from "react";

export function Providers({children}: { children: ReactNode }) {
    return (
        <NextUIProvider className="flex flex-col min-h-dvh dark">
            {children}
        </NextUIProvider>
    );
}
