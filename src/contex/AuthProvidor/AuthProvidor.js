import React, { createContext, useEffect, useState } from 'react';
import app from '../../fairbase/fairbase.configh';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);


const AuthProvidor = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleLogin = (provider) =>{
        return signInWithPopup(auth, provider);
    } 
    

    const createUser = (email, password) =>{
      setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) =>{
      setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
      return signOut(auth);
    };
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          // console.log(currentUser);
          setUser(currentUser);
          setLoading(false);
        });
        return () =>{
            return unsubscribe();
        }
    }, []);

    const authInfo = {
      user,
      loading,
      createUser,
      googleLogin,
      logOut,
      signIn,
      updateUserProfile,
    };


    return (
      <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
    
};

export default AuthProvidor;