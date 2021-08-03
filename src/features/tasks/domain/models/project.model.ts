import { Task } from '../../../../core/domain';

export interface Project {
    uid: string;
    title: string;
    description?: string;
    authorUid: string;
    executerUid: string;
    projectUid: string;
    task?: Tasks;
}

