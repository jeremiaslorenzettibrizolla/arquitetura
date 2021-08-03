import { TaskEntity } from '../../../projects/infra';
import { Task } from '../../domain';

export class TaskRepository {
    async create(params: Task): Promise<Task> {
        const { title, description, authorUID, executerUID, projectUID } = params;

        const task = await TaskEntity.create({
            title, 
            description, 
            authorUID, 
            executerUID, 
            projectUID
        }).save();

        return Object.assign({}, params, task);
    }

    async getAll(): Promise<Task[]> {
        const tasks = await TaskEntity.find({
            relations: ['author', 'executer', 'project']
        });

        return tasks.map(task => ({
            uid: task.uid,
            title: task.title,
            description: task.description,
            authorUID: task.authorUID,
            executerUID: task.executerUID,
            projectUID: task.projectUID,
            author: task.author,
            executer: task.executer,
            project: task.project
        }));
    }

    async getOne(uid: string): Promise<Task | null> {
        const task = await TaskEntity.findOne({
            where: { uid },
            relations: ['author', 'executer', 'project']
        });

        if (!task) {
            return null
        }

        return {
            uid: task.uid,
            title: task.title,
            description: task.description,
            authorUID: task.authorUID,
            executerUID: task.executerUID,
            projectUID: task.projectUID,
            author: task.author,
            executer: task.executer,
            project: task.project
        };
    }

    async update(uid: string, params: Task): Promise<Task | null> {
        const task = await TaskEntity.findOne(uid);

        if (!task) {
            return null;
        }
        
        task.title = params.title;
        task.description = params.description;
        task.executerUID = params.executerUID;
        task.save();

        return {
            uid: task.uid,
            title: task.title,
            description: task.description,
            authorUID: task.authorUID,
            executerUID: task.executerUID,
            projectUID: task.projectUID,
            author: task.author,
            executer: task.executer,
            project: task.project
        };
    }

    async delete(uid: string): Promise<void> {
        const task = await TaskEntity.findOne(uid);

        if (task) {
            task.remove();
        }
    }
}