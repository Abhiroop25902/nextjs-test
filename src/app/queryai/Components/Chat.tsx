import TextArea from "@/app/queryai/Components/TextArea";

export default function Chat() {
    return (<div className={` flex flex-grow flex-col h-full p-2`}>

        <div className={`flex-grow`}>
            Chat History
        </div>
        <TextArea/>
    </div>)
}