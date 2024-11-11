"use client";

import { Field, Label, Input } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useId, useState } from "react";

type InputBoxProp = {
  label: string;
  errorDisplayString: string;
  inputVerification?: (text: string) => Promise<boolean>;
  inputType?: string;
};

export default function InputBox(props: InputBoxProp) {
  const initialTranslateState = "0.5rem 0rem";
  const reducedTranslateState = "0.5rem -0.6rem";

  const labelId = useId();
  const inputId = useId();
  const errorId = useId();

  const reduceLabelSize = useCallback(() => {
    const labelElement = document.getElementById(labelId);
    if (labelElement === null)
      throw new Error(`Element with id: ${labelId} not found`);

    labelElement.style.transform = "scale(0.75)";
    labelElement.style.translate = reducedTranslateState;
  }, [labelId]);

  const resetLabelSize = useCallback(() => {
    const labelElement = document.getElementById(labelId);
    if (labelElement === null)
      throw new Error(`Element with id: ${labelId} not found`);

    labelElement.style.transform = "scale(1)";
    labelElement.style.translate = initialTranslateState;
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

    const labelElement = document.getElementById(labelId);
    if (labelElement === null)
      throw new Error(`Element with id: ${inputId} not found`);
    labelElement.addEventListener("click", () => {
      inputElement.focus();
    });
  }, [hidden, inputId, labelId, reduceLabelSize, resetLabelSize]);

  return (
    <Field>
      <div
        className={`block w-80 rounded-md border-0 p-1.5 text-gray-900 
      shadow-sm focus-within:ring-2 focus-within:ring-inset focus:ring-indigo-600
      bg-slate-700 h-14 flex justify-between items-center`}
      >
        <Label
          className={`inline-block color-white w-0 text-gray-400 origin-top transition-all ease-in-out duration-300 cursor-text`}
          style={{
            translate: initialTranslateState,
          }}
          id={labelId}
        >
          {props.label}
        </Label>
        <Input
          className={`focus-visible:outline-0 bg-transparent placeholder:hidden px-2 pt-3 text-white grow`}
          name="username"
          id={inputId}
          type={hidden === true ? "password" : ""}
          onChange={async (e) => {
            if (props.inputVerification === undefined) return;

            const inputText = e.target.value;
            const toHide = await props.inputVerification(inputText);

            const errorElement = document.getElementById(errorId);

            if (errorElement === null) {
              throw new Error(`Element with id: ${inputId} not found`);
            }

            if (!toHide) {
              //you need to remove "hidden" if it exist
              errorElement.className = errorElement.className
                .split(" ")
                .filter((w) => w !== "hidden")
                .join(" ");
            } else {
              errorElement.className = errorElement.className + " hidden";
            }
          }}
        ></Input>

        {hidden === true && (
          <div
            className="h-10 w-10 cursor-pointer flex-none"
            onClick={() => setHidden(false)}
          >
            <EyeIcon className={`p-2`} color="var(--foreground)" />
          </div>
        )}
        {hidden === false && (
          <div
            className="h-10 w-10 cursor-pointer flex-none"
            onClick={() => setHidden(true)}
          >
            <EyeSlashIcon className={`p-2`} color="var(--foreground)" />
          </div>
        )}
        {/* When I am clicking the icons multiple times, next text gets selected
            to avoid it I added a 0px font size char tat will get selected instead */}
        <p style={{ fontSize: "0px" }}>a</p>
      </div>
      <div className="h-4">
        <div className="pt-1 flex items-center hidden" id={errorId}>
          <span>
            <ExclamationCircleIcon className="h-5 flex-none mr-1 text-error-color" />
          </span>
          <p
            style={{ visibility: "visible" }}
            className="text-error-color inline flex-auto text-xs"
          >
            {props.errorDisplayString}
          </p>
        </div>
      </div>
    </Field>
  );
}
