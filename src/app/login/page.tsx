import { Button, Fieldset, Legend } from "@headlessui/react";
import InputBox from "../Components/inputBox";

async function verifyEmail(text: string): Promise<boolean> {
  "use server";
  const emailRe =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return text.toLowerCase().match(emailRe) !== null;
}

async function verifyPassword(text: string) {
  "use server";
  return text.length !== 0;
}

export default async function LoginPage() {
  return (
    <div className="grid flex-auto items-center justify-items-center ">
      <div className="z-10 card px-10 py-10 rounded-md w-100">
        <Fieldset>
          <div className={`flex flex-col space-y-5`}>
            <Legend className={"text-2xl font-bold"}> Sign In</Legend>
            <InputBox
              label="Email"
              inputVerification={verifyEmail}
              errorDisplayString="Valid email is required: foobar@example.com"
            />
            <InputBox
              label="Password"
              inputType="password"
              inputVerification={verifyPassword}
              errorDisplayString="Password should not be empty"
            />
            <Button
              className={`bg-button-color hover:bg-button-color-hover
              rounded-md px-3 py-2 font-semibold text-white
              focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2  focus-visible:outline-button-color flex-1`}
            >
              Sign In
            </Button>
          </div>
        </Fieldset>
      </div>
    </div>
  );
}
