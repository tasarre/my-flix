import "./config"
import "firebase/auth";
import * as firebase from "firebase";

const auth = firebase.auth()

export const getCurrentUser = () => {
  return auth.currentUser.email
}
export const signUp = newAccount => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(newAccount.email, newAccount.psw)
        .then(() => {resolve(true)
        })
        .catch(function(error) {
            reject(error)
          });
    })
   
}

export const authenticateUser = () => {
    return new Promise((resolve, reject) => {
   auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log(` User is signed in`)
          console.log({ user })
          resolve(user)
        } else {
          console.log(`No user is signed in`)
          reject(`No user is signed in`)
        }
      });
    });
}

export const signIn = credentials => {
  return new Promise((resolve, reject) => { 
    auth.signInWithEmailAndPassword(credentials.email, credentials.psw)
    .then(user => {
      resolve(user)
    })
    .catch(function(error) {
      reject(error)
    });
  })
}

export const signOut = () => {
  auth.signOut().then(function() {
    console.log(`Sign-out successful.`)
  }).catch(function(error) {
    console.log(` An error happened ${error}`)
  });
}
export const sendEmailVerification = () => {
    var user = auth.currentUser
    user.sendEmailVerification().then(function() {
        console.log(`email verification successfully sent`)
      }).catch(function(error) {
        console.log(`error sending email verification ${error}`)
      });
}

export const resetPassword = email => {
  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email).then(function() {
      resolve(true)
      console.log(`email verification successfully sent to ${email}`)
    }).catch(function(error) {
      reject(error)
      console.log(`error sending reset email : ${error}`)
    });
  });
}