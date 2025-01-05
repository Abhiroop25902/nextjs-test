import {z} from "zod";

export const SignUpFormNames = {
    email: "email",
    password: "password",
};

export const SignUpFormSchema = z.object({
    [SignUpFormNames.email]: z
        .string()
        .email({message: "Please enter a valid email"})
        .trim(),
    [SignUpFormNames.password]: z
        .string()
        .min(8, {message: "Should be at least 8 characters long"})
        .regex(/[a-zA-Z]/, {message: "Should contain at least one letter."})
        .regex(/[0-9]/, {message: "Should contain at least one number."})
        .regex(/[^a-zA-Z0-9]/, {
            message: "Should contain at least one special character.",
        })
        .trim(),
});

export type SignUpFormState =
    | {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
}
    | undefined;

export type AuthDataSchema = {
    email: string;
    hash: string;
    verified: boolean
}

export type EmailData = {
    to: Array<string>;
    message: {
        subject: string;
        html: string;
    }
}
