import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth";
import { auth } from "config/firebase";
import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { UserData } from "types/interfaces";

type Props = {
    children: React.ReactNode,
}

interface AuthContextTypes {
    createUser: (email: string, password: string) => void,
    logout: () => void,
    signIn: (email: string, password: string) => void,
    currectUser: any,
}

const AuthContext = createContext<AuthContextTypes>({
    createUser: (email, password) => { },
    logout: () => { },
    signIn: (email, password) => { },
    currectUser: null
});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [currectUser, setCurrentUser] = useState<any>();
    const [blockedUsers, setBlockedUsers] = useState<string[]>([])

    useEffect(() => {
        const getBlockedUsers = () => {
            const usersRef = ref(db, 'users/')
            onValue(usersRef, (snapshot) => {
                const data: UserData[] = snapshot?.val()

                if (data) {
                    const blockedUsers = Object.values(data).filter(user => user.userStatus === "blocked").map(user => user.userEmail);
                    setBlockedUsers(blockedUsers)
                }
            })
        }

        getBlockedUsers();
    }, [])

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const signIn = (email: string, password: string) => {
        if(blockedUsers.includes(email)) {
            throw new Error(`User "${email}" is blocked !`);
        } else {
            return signInWithEmailAndPassword(auth, email, password)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ createUser, logout, signIn, currectUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }