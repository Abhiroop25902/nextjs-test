import {NextResponse} from "next/server";
import {markEmailVerificationDone} from "@/app/lib/fireStoreFunctions";
import {BASE_URI} from "@/app/lib/definition";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ userId: string }> }
) {
    const userId = (await params).userId;
    console.log(userId);
    try {
        // will throw if userId does not exist or the user is already email verified
        await markEmailVerificationDone(userId);
        // normal /emailVerified does not work, cause the email link is '_blank', it redirects to 0.0.0.0:8080/emailVerified
        return NextResponse.redirect(new URL(BASE_URI + '/emailVerified', req.url));
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack);
        } else console.error(error);

        // normal /404 does not work, cause the email link is '_blank', it redirects to 0.0.0.0:8080/404
        return NextResponse.redirect(new URL(BASE_URI + '/404', req.url));
    }
}
