"use client";
import { Input } from "@nextui-org/input";
import { useMemo, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../Components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../Components/EyeFilledIcon";

const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const isEmailValid = useMemo(() => {
    if (email === "") return true;

    return validateEmail(email) !== null;
  }, [email]);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const isPasswordValid = useMemo(() => {
    if (password === "") return false;
    return true;
  }, [password]);

  const toggleVisibility = () => setPasswordVisible(!isPasswordVisible);
  return (
    <div className="grid flex-auto items-center justify-items-center">
      <Card className="px-10 py-5">
        <CardHeader>
          <h1 className="text-lg">Log In</h1>
        </CardHeader>
        <CardBody className="space-y-5">
          <Input
            value={email}
            onValueChange={setEmail}
            type="email"
            label="Email"
            isInvalid={!isEmailValid}
            errorMessage="Please enter a valid email"
            variant="bordered"
          />
          <Input
            value={password}
            onValueChange={setPassword}
            variant="bordered"
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility();
                }}
                aria-label="toggle password visibility"
              >
                {isPasswordVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isPasswordVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <div className="flex flex-row justify-center">
            <Button
              color="primary"
              className="flex-none"
              isDisabled={!(isEmailValid && isPasswordValid)}
              onPress={() => {
                console.log(email);
                console.log(password);
              }}
            >
              Login
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
