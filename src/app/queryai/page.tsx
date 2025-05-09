import {Metadata} from "next";
import CenterPanel from "@/app/queryai/Components/CenterPanel";
import Chat from "@/app/queryai/Components/Chat";
import Chart from "@/app/queryai/Components/Chart";

export const metadata: Metadata = {
    title: "QueryAI",
};

export default function QueryAI() {
    return (
        <div className="flex flex-grow p-4 gap-4">
            <CenterPanel className={`w-8/12`}>
                <Chat/>
            </CenterPanel>

            <CenterPanel className={`w-4/12`}>
                <Chart/>
            </CenterPanel>
        </div>
    );
}