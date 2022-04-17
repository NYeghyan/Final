import { useState, useEffect, useContext, createContext } from 'react';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import fireBaseApp from '../lib/firebase';

const firebaseAuthRef = getAuth(fireBaseApp);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useUserAuth() {
  return useContext(authContext);
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) =>
    signInWithEmailAndPassword(firebaseAuthRef, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );

  /**
   *
   * @param {String} email - email of the user
   * @param {String} password  - password of the user
   * @returns - singed up user
   */
  const signup = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      firebaseAuthRef,
      email,
      password
    );

    setUser(response.user);
    localStorage.setItem(user.email, JSON.stringify(user.uid));
    return response;
  };

  const signout = async () => {
    await signOut(firebaseAuthRef);
    setUser(false);
  };

  // const sendPasswordResetEmail = (email) => {
  //   return sendPasswordResetEmail(email).then(() => {
  //     return true;
  //   }),
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuthRef,
      (StateChangeUser) => {
        if (StateChangeUser) {
          setUser(StateChangeUser);
        } else {
          setUser(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    signup,
    signout,
    signin,
    // confirmPasswordReset,
  };
}
