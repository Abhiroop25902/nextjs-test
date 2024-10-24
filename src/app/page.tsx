"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
          <button
            className="bg-indigo-600 hover:bg-indigo-500 
    rounded-md px-3 py-2 font-semibold text-white
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
            onClick={() => {
              router.push("/count");
            }}
          >
            Count
          </button>
        </div>
      </div>
    </div>
  );
}
