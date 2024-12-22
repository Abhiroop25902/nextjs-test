import {app} from "@/app/lib/firebaseApp";
import {addDoc, collection, getCountFromServer, getDocs, getFirestore} from "@firebase/firestore";
import {AuthDataSchema} from "@/app/lib/definition";

const db = getFirestore(app);
const AUTH_COLLECTION_NAME = "authData";

export async function emailAlreadyPresent(signUpEmail: string) {
    const querySnapshot = await getDocs(collection(db, AUTH_COLLECTION_NAME));
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
    const coll = collection(db, AUTH_COLLECTION_NAME);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
}

export async function addUserEmailAndPasswordHash(email: string, passwordHash: string) {
    try {
        const data: AuthDataSchema = {
            email: email,
            hash: passwordHash
        }

        await addDoc(collection(db, AUTH_COLLECTION_NAME), data);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}