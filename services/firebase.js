import { getApps, initializeApp } from "firebase/app";
import {
    LogBox,
} from "react-native";
import Config from '../constants/config'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, get, child } from 'firebase/database';
import uuid from "uuid";

const firebaseConfig = Config.Firebase;

LogBox.ignoreLogs([
    `Setting a timer for a long period`,
    'RFC',
    'Require cycle',
    'children'
]);

export const initFirebase = () => {
    if (!getApps().length) {
        initializeApp(firebaseConfig);
    }
}

export const signUp = async (email, password) => {
    try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.log(err)
    }
}

export const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}

export const fetchInventory = async (onSuccess, onError, id = null) => {
    const _dbRef = dbRef(getDatabase());
    try {
        const snapshot = await get(child(_dbRef, 'inventory/' + (id || '')))
        if (snapshot.exists()) {
            onSuccess?.(snapshot.val())
        } else {
            onSuccess?.({})
        }
    } catch (err) {
        onError?.(err)
    }
}

export const fetchSales = async (onSuccess, onError) => {
    const _dbRef = dbRef(getDatabase());
    try {
        const snapshot = await get(child(_dbRef, 'sales'))
        if (snapshot.exists()) {
            onSuccess?.(snapshot.val())
        } else {
            onSuccess?.({})
        }
    } catch (err) {
        onError?.(err)
    }
}
