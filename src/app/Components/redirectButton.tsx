// TODO: refactor it to just button, decouple redirection using a function as a prop
"use client";

import { useRouter } from "next/navigation";

interface Prop {
  url: string;
  text: string;
}

export default function RedirectButton({ url, text }: Prop) {
  const router = useRouter();
  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-500 
    rounded-md px-3 py-2 font-semibold text-white
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
      onClick={() => {
        router.push(url);
      }}
    >
      {text}
    </button>
  );
}
