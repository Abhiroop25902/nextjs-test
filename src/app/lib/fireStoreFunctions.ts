import {app} from "@/app/lib/firebaseApp";
import {AuthDataSchema} from "@/app/lib/definition";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore(app);
const AUTH_COLLECTION_NAME = "authData";

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

export async function addUserEmailAndPasswordHash(email: string, passwordHash: string) {
    try {
        const data: AuthDataSchema = {
            email: email,
            hash: passwordHash,
            verified: false,
        }

        await db.collection(AUTH_COLLECTION_NAME).add(data);
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
