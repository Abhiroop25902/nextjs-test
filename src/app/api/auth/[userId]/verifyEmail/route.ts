import {NextResponse} from "next/server";
import {markEmailVerificationDone} from "@/app/lib/fireStoreFunctions";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ userId: string }> }
) {
    const userId = (await params).userId;
    console.log(userId);
    try {
        // will throw if userId does not exist or the user is already email verified
        await markEmailVerificationDone(userId);
        return NextResponse.redirect(new URL('/emailVerified', req.url));
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack);
        } else console.error(error);


        return NextResponse.redirect(new URL('/404', req.url));
    }
}
