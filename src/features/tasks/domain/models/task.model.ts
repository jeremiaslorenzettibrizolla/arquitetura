import { Project, User } from "../../../projects/domain";

export interface Task {
    uid: string;
    title: string;
    description?: string;
    authorUID: string;
    executerUID: string;
    projectUID: string;
    author: User;
    executer: User;
    project: Project;
}