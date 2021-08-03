import { Router } from'express';
import { EMVC } from '../../../../core/presentation';
import { routerMvcAdapter } from '../../../../core/presentation';
import { TaskController } from '../controllers';
import { MVCController } from '../../../../core/presentation';
import { TaskRepository } from '../../infra';
import { CacheRepository } from '../../infra';

const makeController = (): MVCController => {
    const repository = new TaskRepository();
    const cache = new CacheRepository();
    return new TaskController(repository, cache);
};

export default class TaskRoutes {
    public init(routes: Router) {
        routes.get('/task', 
               routerMvcAdapter(makeController(), EMVC.INDEX));

        routes.get('/task/:uid',
               routerMvcAdapter(makeController(), EMVC.SHOW));

        routes.post('/task', 
               routerMvcAdapter(makeController(), EMVC.STORE));
    }
}