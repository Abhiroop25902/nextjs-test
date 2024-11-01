import { Metadata } from "next";
import CountComponent from "./components/countComponent";

export const metadata: Metadata = {
  title: "Count Page",
  description: "Count",
};

export default function CountingPage() {
  return (
    <main
      className="grid flex-auto items-center justify-items-center 
     font-[family-name:var(--font-geist-sans)]"
    >
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-5xl font-bold">Clicking Test</h1>
        <CountComponent />
      </div>
    </main>
  );
}
