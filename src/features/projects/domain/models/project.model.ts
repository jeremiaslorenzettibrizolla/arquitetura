import { User } from '../../../../core/domain';

export interface Project {
    uid: string;
    name: string;
    description?: string;
    startAt?: Date;
    finishAt?: Date;
    userUid: string;
    user?: User;
}

