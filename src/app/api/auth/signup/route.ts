"use server";

import {SignUpFormNames, SignUpFormSchema, SignUpFormState} from "@/app/lib/definition";

async function signUp(credentials: string, param2: { email: any; password: any }) {
    throw new Error('CredentialsSignIn');
}

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();

        const email: string | null = data.email;
        const password: string | null = data.password;

        //redundant check in server side also to make sure random POST request does not break the backend
        const validatedFields = SignUpFormSchema.safeParse({
            [SignUpFormNames.email]: email,
            [SignUpFormNames.password]: password,
        });
        if (!validatedFields.success)
            return Response.json({
                    success: false,
                    error: validatedFields.error.flatten().fieldErrors
                },
                {status: 422});


        await signUp('credentials', {email: email, password: password});

        return Response.json({
                success: true,
            },
            {status: 200});

        // res.status(200).json({success: true});

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
                password: [errorResponseString],
            }
        };
        return Response.json(
            responseJson,
            {status: errorResponseStatus});
    }
}
