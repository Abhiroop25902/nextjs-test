import {app} from "@/app/lib/firebaseApp";
import {collection, getDocs, getFirestore} from "@firebase/firestore";

const db = getFirestore(app);
const AUTH_COLLECTION_NAME = "authData";

export async function emailAlreadyPresent(signUpEmail: string) {
    const querySnapshot = await getDocs(collection(db, AUTH_COLLECTION_NAME));
    let present = false;

    querySnapshot.forEach(doc => {
        if (present) {
            return
        }

        if (doc.id === signUpEmail) {
            present = true;
        }
    });

    return present;
}