import "./config"
import "firebase/firestore";
import * as firebase from "firebase";
import { getCurrentUser } from "../api/Auth"
const collections = {
    favorites: "favorites"
}

const db = firebase.firestore()

//write & delete
export const write = item => {
    item.isFavorite = true
    const doc = { user: getCurrentUser(), item: item}
    db.collection(collections.favorites).doc(item.imdb).set(doc)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch(error => {
        console.error("Error writing document: ", error);
    }); 
}

export const remove = item => {
    db.collection(collections.favorites).doc(item.imdb).delete()
    .then(() => {
        console.log("Document successfully deleted!");
    }).catch(error => {
        console.error("Error removing document: ", error);
    });
}   

//read
export const read = () => {
   return new Promise((onSuccess, onFail) => {
        db.collection(collections.favorites) 
        .get()
        .then(querySnapshot => {
            onSuccess(querySnapshot)
        })
        .catch(err => onFail(err))
    })
}