
import { createContext, useEffect, useState } from "react";
import { UserBasic, UserData } from "types/interfaces";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { db } from "config/firebase";
import { ref, set, onValue, remove } from "firebase/database";
import { auth } from "config/firebase";
import { deleteUser, signOut } from "firebase/auth";
import { toastNotifications } from "common/Toastify/index";

type Props = {
    children: React.ReactNode,
}

interface UsersContextTypes {
    usersData: UserData[],
    selectedUsers: GridRowSelectionModel,
    updateSelectedUsers: (ids: GridRowSelectionModel) => void,
    DeleteUsers: () => void,
    BlockUsers: () => void,
    UnblockUsers: () => void,
    addUser: (data: UserBasic) => void
}

const UsersContext = createContext<UsersContextTypes>({
    usersData: [],
    selectedUsers: [],
    updateSelectedUsers: (ids) => { },
    DeleteUsers: () => { },
    BlockUsers: () => { },
    UnblockUsers: () => { },
    addUser: (data) => { },
})

const UsersProvider: React.FC<Props> = ({ children }) => {
    const [usersData, setUsersData] = useState<UserData[]>([])
    const [selectedUsers, setSelectedUsers] = useState<GridRowSelectionModel>([])

    useEffect(() => {
        const getUsers = () => {
            const usersRef = ref(db, 'users/')
            onValue(usersRef, (snapshot) => {
                const data: UserData[] = snapshot?.val()

                if (data) {
                    setUsersData(Object.values(data))
                }
            })
        }

        getUsers();
    }, [])


    const addUser = async (data: UserBasic): Promise<void> => {
        const createdAt: string = auth.currentUser?.metadata.creationTime ?? new Date().toISOString();
        const lastLoginAt: string = auth.currentUser?.metadata.lastSignInTime ?? new Date().toISOString();
    
        const usersRef = ref(db, 'users/' + data.id);
    
        const userData: UserData = {
            ...data,
            createdAt: createdAt,
            lastLoginAt: lastLoginAt
        };
    
        try {
            await set(usersRef, userData);
        } catch (error: any) {
            throw new Error (error.message); 

        }
    };

    const updateSelectedUsers = (ids: GridRowSelectionModel) => {
        setSelectedUsers(ids);
    }

    const DeleteUsers = async (): Promise<void> => {
        for (const user of usersData) {
            if (selectedUsers.includes(user.id)) {
                const usersRef = ref(db, 'users/' + user.id);
                await remove(usersRef);
                if (auth.currentUser?.email === user.userEmail) {
                    await DeleteCurrentUsers(auth.currentUser);
                }
            }
        }
        toastNotifications.info()
    }

    const DeleteCurrentUsers = async (user: any) => {
        try {
            await deleteUser(user)
        } catch (error: any) {
            toastNotifications.error(error.message)
        }
    }

    const BlockUsers = async (): Promise<void> => {
        for (const user of usersData) {
            if (selectedUsers.includes(user.id)) {
                const usersRef = ref(db, 'users/' + user.id);
                const updateUser: UserData = {
                    ...user,
                    userStatus: "blocked"
                };

                try {
                    await set(usersRef, updateUser);
                    if (auth.currentUser?.email === user.userEmail) {
                        window.setTimeout(()=>{
                            signOut(auth);
                        }, 500 )
                        
                    }
                } catch (error: any) {
                    toastNotifications.error(error.message)
                }
            }
        }
        toastNotifications.info()
    };

    const UnblockUsers = async (): Promise<void> => {
        for (const user of usersData) {
            if (selectedUsers.includes(user.id)) {
                const usersRef = ref(db, 'users/' + user.id);
                const updateUser: UserData = {
                    ...user,
                    userStatus: "active"
                };

                try {
                    await set(usersRef, updateUser);
                } catch (error: any) {
                    toastNotifications.error(error.message)
                }
            }
        }
        toastNotifications.info()
    };



    return (
        <UsersContext.Provider value={{ usersData, selectedUsers, addUser, updateSelectedUsers, DeleteUsers, BlockUsers, UnblockUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider }