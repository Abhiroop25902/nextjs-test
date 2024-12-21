"use client";
import {FormEvent, useState} from "react";
import {Button, Card, CardBody, CardHeader, CircularProgress, Form, Input,} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "../Components/EyeSlashFilledIcon";
import {EyeFilledIcon} from "../Components/EyeFilledIcon";
import {SignUpFormNames, SignUpFormSchema} from "../lib/definition";

export default function LoginPage() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get(SignUpFormNames.username)?.toString();
        const email = formData.get(SignUpFormNames.email)?.toString();
        const password = formData.get(SignUpFormNames.password)?.toString();

        //validate form fields
        const validatedFields = SignUpFormSchema.safeParse({
            username: username,
            email: email,
            password: password,
        });

        if (!validatedFields.success)
            setErrors(validatedFields.error.flatten().fieldErrors);
        else {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password}),
            });
            const responseBody = await response.json();


            if (response.ok) {
                console.log('SignUp Successful');
            } else {
                console.log(responseBody);
                setErrors(responseBody.errors);
            }
        }


        setIsLoading(false);
    };

    const toggleVisibility = () => setPasswordVisible(!isPasswordVisible);
    return (
        <div className="grid flex-auto items-center justify-items-center">
            <Form
                onSubmit={handleSubmit}
                validationBehavior="aria"
                validationErrors={errors}
            >
                <Card className="px-10 py-5">
                    <CardHeader>
                        <h1 className="text-lg">Sign Up</h1>
                    </CardHeader>
                    <CardBody className="space-y-5">
                        <Input
                            label="Username"
                            variant="bordered"
                            name={SignUpFormNames.username}
                        />
                        <Input
                            type="email"
                            label="Email"
                            variant="bordered"
                            name={SignUpFormNames.email}
                        />
                        <Input
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
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isPasswordVisible ? "text" : "password"}
                            className="max-w-xs"
                            name={SignUpFormNames.password}
                        />
                        <div className="flex flex-row justify-center">
                            <Button
                                type="submit"
                                color="primary"
                                className="flex-none"
                                onPress={() => {
                                }}
                            >
                                {isLoading ? <CircularProgress/> : "Login"}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Form>
        </div>
    );
}
