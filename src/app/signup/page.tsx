"use client";
import {FormEvent, useState} from "react";
import {Button, Card, CardBody, CardHeader, CircularProgress, Form, Input,} from "@nextui-org/react";
import {SignUpFormNames, SignUpFormSchema} from "../lib/definition";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get(SignUpFormNames.email)?.toString();
        const password = formData.get(SignUpFormNames.password)?.toString();

        //validate form fields
        const validatedFields = SignUpFormSchema.safeParse({
            email: email,
            password: password,
        });

        if (!validatedFields.success)
            setErrors(validatedFields.error.flatten().fieldErrors);
        else {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const responseBody = await response.json();


            if (response.ok) {
                console.log('SignUp Successful');
            } else {
                setErrors(responseBody.errors);
            }
        }

        setIsLoading(false);
    };

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
                            type="email"
                            label="Email"
                            variant="bordered"
                            name={SignUpFormNames.email}
                        />
                        <Input
                            variant="bordered"
                            label="Password"
                            type="password"
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
