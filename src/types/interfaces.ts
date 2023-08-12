



export type UserStatus = "active" | "blocked";

export interface UserLogin {
    userEmail: string;
    userPassword: string;
}

export interface UserBasic {
    readonly id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userStatus: UserStatus;
}

export interface UserData extends UserBasic {
    createdAt: string;
    lastLoginAt: string
}
