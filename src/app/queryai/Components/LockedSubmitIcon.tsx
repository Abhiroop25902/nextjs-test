import {LockClosedIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid";

export default function LockedSubmitIcon() {
    return (
        <div className={`flex flex-col items-end pt-3`}>
            <PaperAirplaneIcon className={`size-6`}/>
            <LockClosedIcon className={`size-3`}/>
        </div>
    )
}