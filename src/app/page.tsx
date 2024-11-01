"use client";

import RedirectButton from "./Components/redirectButton";

export default function Page() {
  return (
    <div
      className="flex flex-auto items-center justify-center 
     font-[family-name:var(--font-geist-sans)]"
    >
      <div className="grid grid-cols-3">
        <h1 className="col-span-3 items-center text-center text-5xl font-bold pb-10 px-16">
          Hello
        </h1>
        <div className="col-span-3 flex justify-around">
          <RedirectButton text="Count" url="/count" />
        </div>
      </div>
    </div>
  );
}
