import { Router } from 'express';
import { EMVC } from '../../../../core/presentation';
import {
  middlewareAdapter,
  routerMvcAdapter,
} from '../../../../core/presentation';
import { ProjectController } from '../controllers';
import { ProjectMiddleware } from '../middlewares';
import { MVCController } from '../../../../core/presentation';
import { CacheRepository, ProjectRepository } from '../../infra';

const makeController = (): MVCController => {
  const repository = new ProjectRepository();
  const cache = new CacheRepository();
  return new ProjectController(repository, cache);
};

export default class ProjectRoutes {
  public init(routes: Router) {
    routes.get('/projects', routerMvcAdapter(makeController(), EMVC.INDEX));

    routes.get('/projects/:uid', routerMvcAdapter(makeController(), EMVC.SHOW));

    routes.post(
      '/projects',
      middlewareAdapter(new ProjectMiddleware()),
      routerMvcAdapter(makeController(), EMVC.STORE),
    );

    routes.post(
      '/projects/:uid',
      middlewareAdapter(new ProjectMiddleware()),
      routerMvcAdapter(makeController(), EMVC.UPDATE),
    );

    routes.post(
      '/projects/:uid',
      routerMvcAdapter(makeController(), EMVC.DELETE),
    );
  }
}
