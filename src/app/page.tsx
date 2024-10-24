import { useRouter } from "next/navigation";
import RedirectButton from "./components/redirectButton";

export default function Page() {
  return (
    <div
      className="flex min-h-screen items-center justify-center 
     font-[family-name:var(--font-geist-sans)]"
    >
      <div className="grid grid-cols-3">
        <h1 className="col-span-3 items-center text-center text-5xl font-bold pb-10">
          Hello
        </h1>
        <div className="col-span-3 flex justify-center">
          <RedirectButton url="/count" text="Count" />
        </div>
      </div>
    </div>
  );
}
