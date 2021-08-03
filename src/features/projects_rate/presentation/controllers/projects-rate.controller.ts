import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, serverError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { ProjectsRateRepository } from '../../infra';
import { CacheRepository } from '../../infra';

export class ProjectsRateController implements MVCController {
    readonly #repository: ProjectsRateRepository;
    readonly #cache: CacheRepository;

    constructor(repository: ProjectsRateRepository, cache: CacheRepository) {
        this.#repository = repository;
        this.#cache = cache;
    }

    public async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get('projects-rate:all');

            if (cache) {
                return ok(cache);
            }
            
            const projects = await this.#repository.getAll();
            await this.#cache.set('projects-rate:all', projects);
            
            return ok(projects);
        } catch (error) {
            return serverError();
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const project = await this.#repository.getOne(uid);

            if (!project) {
                return notFound();
            }

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

    update(request: HttpRequest): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }

    delete(request: HttpRequest): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
}