import {Description, Field, Input, Label} from "@headlessui/react";
import {RefObject, ReactNode} from "react";


export default function DialogInput({children, labelString, ref, defaultValue}: {
    children: ReactNode[]
    labelString: string,
    ref: RefObject<HTMLInputElement>,
    defaultValue: string
}) {
    return <Field>
        <Label className={`text-sm/6 font-medium text-white`}>{labelString}</Label>
        <Description className="text-xs text-gray-500">{children}</Description>
        <Input
            type={"password"}
            ref={ref}
            className={`mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 
            text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 
            data-focus:outline-white/25`}
            defaultValue={defaultValue ?? ""}
        />
    </Field>
}