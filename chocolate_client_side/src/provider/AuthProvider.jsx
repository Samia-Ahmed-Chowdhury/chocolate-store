import { getAuth, createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
    const [userEmail, setUserEmail] = useState(null)
    const [loadedData, setLoadedData] = useState([])
    const [photoUrl, setPhotoUrl] = useState('')
    const [userName, setUserName] = useState(null);

    const googleHandler = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (name, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name,photo_url) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo_url
        })
    }

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logOut = () => {
        signOut(auth).then(() => {
            setUserEmail(null)
        }).catch((error) => {
            // An error happened.
        });
    }

    // observer user auth state 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUserEmail(currentUser?.email)
            console.log(currentUser?.email)
            if (currentUser && currentUser?.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:3000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },     
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('access-token',data.token)
                    })
            }
            else{
                console.log('not fount email')
                localStorage.removeItem('access-token')
            }
        });

        // stop observing while unmounting 
        return () => {
            return unsubscribe();
        }
    }, [])


    const userProviderInfo = {
        googleHandler, createUser, updateUserProfile,logInUser,userName, setUserName,setPhotoUrl,photoUrl, userEmail, setUserEmail, logOut, loadedData, setLoadedData
    }

    return (
        <AuthContext.Provider value={userProviderInfo}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider