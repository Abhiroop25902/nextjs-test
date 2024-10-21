"use client";
import { useState } from "react";

export default function CountingPage() {
  const [count, setCount] = useState(0);

  const incrementCount = function () {
    setCount(count + 1);
  };

  return (
    <main className="flex flex-col gap-8 items-center">
      <h1 className="text-5xl font-bold">Clicking Test</h1>
      <p>You have clicked the button {count} times.</p>
      <button
        className="inline-flex items-center rounded-md bg-indigo-600 
        px-3 py-2  font-semibold text-white hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={incrementCount}
      >
        Button
      </button>
    </main>
  );
}
