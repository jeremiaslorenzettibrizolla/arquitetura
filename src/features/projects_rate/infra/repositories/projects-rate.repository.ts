import { ProjectsRateEntity } from '../../../../core/infra/data/database/entities';
import { ProjectsRate } from '../../domain/models';

export class ProjectsRateRepository {
    async create(params: ProjectsRate): Promise<ProjectsRate> {
        const { userUid, projectUid, rate } = params;

        const project = await ProjectsRateEntity.create({
            userUid, 
            projectUid, 
            rate
        }).save();

        return Object.assign({}, params, project);
    }

    async getAll(): Promise<ProjectsRate[]> {
        const projects = await ProjectsRateEntity.find();

        return projects.map(rate => ({
            uid: rate.uid,
            userUid: rate.userUid,
            projectUid: rate.projectUid,
            rate: rate.rate
        }));
    }

    async getOne(uid: string): Promise<ProjectsRate | null> {
        const rate = await ProjectsRateEntity.findOne(uid);

        if (!rate) {
            return null
        }

        return {
            uid: rate.uid,
            userUid: rate.userUid,
            projectUid: rate.projectUid,
            rate: rate.rate
        };
    }
}