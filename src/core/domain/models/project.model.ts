import { User } from '..';

export interface Project {
    uid: string;
    name: string;
    description?: string;
    startAt?: Date;
    finishAt?: Date;
    userUid: string;
    user?: User;
}

