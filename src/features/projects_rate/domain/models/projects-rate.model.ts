import { User } from '../../../../core/domain';
import { Project } from '..';

export interface ProjectsRate {
    uid: string;
    rate: number;
    userUid: string;
    user?: User;
    projectUid: string;
    project?: Project;
}

