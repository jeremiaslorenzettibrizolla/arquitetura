import { Router } from'express';
import { EMVC } from '../../../../core/presentation';
import { routerMvcAdapter } from '../../../../core/presentation';
import { ProjectsRateController } from '../controllers';
import { MVCController } from '../../../../core/presentation';
import { ProjectsRateRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new ProjectsRateRepository();
    const cache = new CacheRepository();
    return new ProjectsRateController(repository, cache);
};

export default class ProjectsRateRoutes {
    public init(routes: Router) {
        routes.get('/project-rate', 
               routerMvcAdapter(makeController(), EMVC.INDEX));

        routes.get('/project-rate/:uid',
               routerMvcAdapter(makeController(), EMVC.SHOW));

        routes.post('/project-rate', 
               routerMvcAdapter(makeController(), EMVC.STORE));
    }
}