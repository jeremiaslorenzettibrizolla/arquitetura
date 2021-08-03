import { DataNotFoundError } from '../../../../core/presentation';
import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, serverError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { ProjectRepository } from '../../infra';
import { CacheRepository } from '../../../../core/infra';

export class ProjectController implements MVCController {
  readonly #repository: ProjectRepository;
  readonly #cache: CacheRepository;

  constructor(repository: ProjectRepository, cache: CacheRepository) {
    this.#repository = repository;
    this.#cache = cache;
  }

  public async index(request: HttpRequest): Promise<HttpResponse> {
    try {
      const cache = await this.#cache.get('project:all');

      if (cache) {
        return ok(cache);
      }

      const projects = await this.#repository.getAll();
      await this.#cache.set('project:all', projects);

      return ok(projects);
    } catch (error) {
      return serverError();
    }
  }

  public async show(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { uid } = request.params;
      const cache = await this.#cache.get(`project:${uid}`);

      if (cache) {
        return ok(cache);
      }

      const project = await this.#repository.getOne(uid);

      if (!project) {
        return notFound();
      }

      await this.#cache.set(`project:${uid}`, project);

      return ok(project);
    } catch (error) {
      return serverError();
    }
  }

  public async store(request: HttpRequest): Promise<HttpResponse> {
    try {
      const project = await this.#repository.create(request.body);
      return ok(project);
    } catch (error) {
      return serverError();
    }
  }

  public async update(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { uid } = request.params;
      const project = await this.#repository.update(uid, request.body);

      await this.#cache.set(`project:${uid}`, project);

      return ok(project);
    } catch (error) {
      return serverError();
    }
  }

  public async delete(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { uid } = request.params;
      await this.#repository.delete(uid, request.body);
      
      await this.#cache.del(`project:${uid}`);

      return ok({});
    } catch (error) {
      return serverError();
    }
  }
}
