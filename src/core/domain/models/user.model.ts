import { ProfileData } from "./profile-data.model";

export interface User {
    uid: string;
    login: string;
    password?: string;
    profileData?: ProfileData;
}