import {app} from "@/app/lib/firebaseApp";
import {AuthDataSchema, EmailData} from "@/app/lib/definition";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore(app);
const AUTH_COLLECTION_NAME = "authData";
const MAIL_COLLECTION_NAME = "mail";

export async function emailAlreadyPresent(signUpEmail: string) {
    const querySnapshot = await db.collection(AUTH_COLLECTION_NAME).get();
    let present = false;

    querySnapshot.forEach(doc => {
        if (present) {
            return
        }

        const docData = doc.data() as AuthDataSchema;

        if (docData.email === signUpEmail) {
            present = true;
        }
    });

    return present;
}

export async function authUsersCount() {
    const coll = db.collection(AUTH_COLLECTION_NAME);
    const snapshot = await coll.count().get();
    return snapshot.data().count;
}

export async function sendActivationEmail(email: string, userId: string): Promise<void> {
    try {
        const emailData: EmailData = {
            to: [email],
            message: {
                subject: 'Email Verification for abhiroop.dev',
                html: `<div style="display: flex;justify-content: center;background-color:#efefef; height:100vh; align-items: center">
                            <div style="width: 500rem;margin-left: 15rem; margin-right: 15rem; border-radius: 20px; background-color: white;border: 1px black solid; height:200px">
                                <div style="display: flex; flex-direction: column; align-items: center; font-family: system-ui">
                                    <h1 style="margin-block-end:0.5rem">Verify Email</h1>
                                    <p style="padding-left: 5rem; padding-right: 5rem; text-align: center">
                                        Please confirm that you want to use this email, clicking the button below will enable your access for <a href="https://abhiroop.dev">abhiroop.dev</a>
                                    </p>
                                    <button 
                                        style="background-color: #0064d7; color: white; border-radius: 10px; padding-left: 1rem; padding-right: 1rem; border: none; height:2.5rem; font-size: 0.875rem; line-height: 1.25rem"
                                        onclick="window.open('https://abhiroop.dev/api/auth/${userId}/verifyEmail')"
                                    >Confirm Email</button>
                                </div>
                            </div>
                        </div>`
            }
        }
        await db.collection(MAIL_COLLECTION_NAME).add(emailData);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export async function addUserEmailAndPasswordHash(email: string, passwordHash: string) {
    try {
        const data: AuthDataSchema = {
            email: email,
            hash: passwordHash,
            verified: false,
        }

        const createdUserDocRef = await db.collection(AUTH_COLLECTION_NAME).add(data);
        await sendActivationEmail(email, createdUserDocRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export async function markEmailVerificationDone(userId: string) {
    const userRef = db.collection(AUTH_COLLECTION_NAME).doc(userId);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        throw new Error(`User with id: ${userId} does not exists`);
    }

    const userData = userDoc.data() as AuthDataSchema;

    if (userData.verified) {
        throw new Error(`User with email: ${userData.email} already verified`);
    }

    await userRef.update({
        verified: true,
    })
}
