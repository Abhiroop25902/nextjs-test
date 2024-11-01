"use client";

import CircularProgressBar from "@/app/Components/circularProgressBar";
import { useEffect, useState } from "react";

const countLocalStorageKey: string = "COUNT_LOCAL_STORAGE_KEY";

export default function CountComponent() {
  const getInitialCount = () => {
    const storedCount = localStorage.getItem(countLocalStorageKey) ?? "0";

    return parseInt(storedCount);
  };

  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const initialCount = getInitialCount();

      setCount(initialCount);
    }, 2000);
  }, []);

  useEffect(() => {
    if (count != null) {
      localStorage.setItem(countLocalStorageKey, count.toString());
    }
  }, [count]);

  const incrementCount = function () {
    if (count != null) {
      setCount(count + 1);
    }
  };

  if (count === null) {
    return <CircularProgressBar heightWidth={50} strokeWidth={2.5} />;
  }
  return (
    <>
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
    </>
  );
}
