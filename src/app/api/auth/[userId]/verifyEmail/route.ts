import {redirect} from "next/navigation";
import {markEmailVerificationDone} from "@/app/lib/fireStoreFunctions";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ userId: string }> }
) {
    const userId = (await params).userId;
    console.log(userId);
    try {
        // will throw if userId does not exist or the user is already email verified
        markEmailVerificationDone(userId);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack);
        } else console.error(error);


        redirect('/404');
    }
}
