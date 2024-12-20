"use server";

import {SignUpFormSchema} from "@/app/lib/definition";

async function signIn(credentials: string, param2: { username: any; email: any; password: any }) {
    throw new Error('CredentialsSignin');
}

export async function POST(
    req: Request
) {
    try {
        const data = await req.json();

        const username: string | null = data.username;
        const email: string | null = data.email;
        const password: string | null = data.password;

        //redundant check in server side also to make sure random POST request does not break the backend
        const validatedFields = SignUpFormSchema.safeParse({
            username: username,
            email: email,
            password: password,
        });
        if (!validatedFields.success)
            return Response.json({
                    success: false,
                    error: validatedFields.error.flatten().fieldErrors
                },
                {status: 422});


        await signIn('credentials', {username: username, email: email, password: password});

        return Response.json({
                success: true,
            },
            {status: 200});

        // res.status(200).json({success: true});

    } catch (error) {
        if (error instanceof Error && error.message === 'CredentialsSignin') {
            return Response.json({
                    error: 'Invalid Credentials',
                },
                {status: 401});
        } else {
            return Response.json({
                    error: 'Something went wrong',
                },
                {status: 500});
        }
    }
}
