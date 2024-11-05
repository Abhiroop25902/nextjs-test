"use client";

import { Field, Label, Input } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useId, useState } from "react";

type InputBoxProp = {
  label: string;
  inputType?: string;
};

export default function InputBox(props: InputBoxProp) {
  const labelId = useId();
  const inputId = useId();
  const noIconDivId = useId();

  const reduceLabelSize = useCallback(() => {
    const labelElement = document.getElementById(labelId);
    if (labelElement === null)
      throw new Error(`Element with id: ${labelId} not found`);

    labelElement.style.transform = "scale(0.75)";
    labelElement.style.translate = "-204px -10px";
  }, [labelId]);

  const resetLabelSize = useCallback(() => {
    const labelElement = document.getElementById(labelId);
    if (labelElement === null)
      throw new Error(`Element with id: ${labelId} not found`);

    labelElement.style.transform = "scale(1)";
    labelElement.style.translate = "-204px 0px";
  }, [labelId]);

  const [hidden, setHidden] = useState(
    props.inputType === "password" ? true : undefined
  );

  useEffect(() => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement === null)
      throw new Error(`Element with id: ${inputId} not found`);
    inputElement.addEventListener("focusin", () => reduceLabelSize());
    inputElement.addEventListener("focusout", () => {
      if (inputElement.value === "") resetLabelSize();
    });

    if (hidden === undefined) {
      const noIconDivElement = document.getElementById(noIconDivId);
      if (noIconDivElement === null)
        throw new Error(`Element with id: ${noIconDivId} not found`);

      noIconDivElement.addEventListener("click", () => {
        inputElement.focus();
      });
    }
  }, [hidden, inputId, noIconDivId, reduceLabelSize, resetLabelSize]);

  return (
    <Field>
      <div
        className={`block w-full rounded-md border-0 p-1.5 text-gray-900 
      shadow-sm focus-within:ring-2 focus-within:ring-inset focus:ring-indigo-600
      bg-slate-700 h-14 flex justify-items-center items-center`}
      >
        <Input
          className={`focus-visible:outline-0 bg-transparent placeholder:hidden px-2 pt-3 text-white`}
          name="username"
          id={inputId}
          type={hidden === true ? "password" : ""}
        ></Input>
        <Label
          className={`inline-block color-white w-0 text-gray-400 origin-top transition-all ease-in-out duration-300`}
          style={{
            translate: "-204px 0px",
          }}
          id={labelId}
        >
          {props.label}
        </Label>
        {hidden === undefined && (
          <div className="h-10 w-10 cursor-text" id={noIconDivId}></div>
        )}
        {hidden === true && (
          <div
            className="h-10 w-10 cursor-pointer"
            onClick={() => setHidden(false)}
          >
            <EyeIcon className={`p-2`} color="var(--foreground)" />
          </div>
        )}
        {hidden === false && (
          <div
            className="h-10 w-10 cursor-pointer"
            onClick={() => setHidden(true)}
          >
            <EyeSlashIcon className={`p-2`} color="var(--foreground)" />
          </div>
        )}
        {/* When I am clicking the icons multiple times, sign in gets selected
        to avoid it I added a 0px font size char tat will get selected instead */}
        <p style={{ fontSize: "0px" }}>a</p>
      </div>
    </Field>
  );
}
