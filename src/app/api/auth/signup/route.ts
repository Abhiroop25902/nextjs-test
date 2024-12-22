"use server";

import {SignUpFormNames, SignUpFormSchema, SignUpFormState} from "@/app/lib/definition";
import {emailAlreadyPresent} from "@/app/lib/fireStoreFunctions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function signUp(email: string, password: string) {
    const emailAlreadyExists = await emailAlreadyPresent(email);

    if (emailAlreadyExists) {
        console.log(`Email already exists: ${email}`);
        throw new Error('CredentialsSignIn');
    }

    throw new Error('CredentialsSignIn');
}

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();

        const email: string | null = data.email;
        const password: string | null = data.password;

        // not needed cause zod will check this, but still for better UX (and does the null check for email and password)
        if (!email && !password)
            return Response.json({
                    success: false,
                    errors: {
                        email: ["Please provide an email"],
                        password: ["Please provide a password"],
                    }
                },
                {status: 422});

        if (!email)
            return Response.json({
                    success: false,
                    errors: {
                        email: ["Please provide an email"],
                    }
                },
                {status: 422});

        if (!password)
            return Response.json({
                    success: false,
                    errors: {
                        password: ["Please provide a password"],
                    }
                },
                {status: 422});

        //redundant check in server side also to make sure random POST request does not break the backend
        const validatedFields = SignUpFormSchema.safeParse({
            [SignUpFormNames.email]: email,
            [SignUpFormNames.password]: password,
        });
        if (!validatedFields.success)
            return Response.json({
                    success: false,
                    errors: validatedFields.error.flatten().fieldErrors
                },
                {status: 422});

        await signUp(email, password);

        return Response.json({
                success: true,
            },
            {status: 200});

    } catch (error) {
        let errorResponseString: string;
        let errorResponseStatus: number;
        if (error instanceof Error && error.message === 'CredentialsSignIn') {
            errorResponseString = 'Invalid Credentials';
            errorResponseStatus = 401;
        } else {
            errorResponseString = 'Something went wrong';
            errorResponseStatus = 500;
        }
        const responseJson: SignUpFormState = {
            errors: {
                email: [errorResponseString],
                password: [errorResponseString],
            }
        };
        return Response.json(
            responseJson,
            {status: errorResponseStatus});
    }
}
