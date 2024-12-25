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
            hash: passwordHash
        }

        await db.collection(AUTH_COLLECTION_NAME).add(data);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}