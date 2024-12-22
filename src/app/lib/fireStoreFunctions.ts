import {app} from "@/app/lib/firebaseApp";
import {collection, getDocs, getFirestore} from "@firebase/firestore";
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