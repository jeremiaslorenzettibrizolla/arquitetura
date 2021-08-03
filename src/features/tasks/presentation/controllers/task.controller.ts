import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, serverError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { TaskRepository } from '../../infra';
import { CacheRepository } from '../../infra';

export class TaskController implements MVCController {
    readonly #repository: TaskRepository;
    readonly #cache: CacheRepository;

    constructor(repository: TaskRepository, cache: CacheRepository) {
        this.#repository = repository;
        this.#cache = cache;
    }

    public async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get('task:all');

            if (cache) {
                return ok(cache);
            }
            
            const tasks = await this.#repository.getAll();
            await this.#cache.set('task:all', tasks);
            
            return ok(tasks);
        } catch (error) {
            return serverError();
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const cache = await this.#cache.get(`task:${uid}`);

            if (cache) {
                return ok(cache);
            }

            const task = await this.#repository.getOne(uid);
            
            if (!task) {
                return notFound();
            }

            await this.#cache.set(`task:${uid}`, task);

            return ok(task);
        } catch (error) {
            return serverError();
        }
    }

    public async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const task = await this.#repository.create(request.body);
            return ok(task);
        } catch (error) {
            return serverError();
        }
    }

    public async  update(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const task = await this.#repository.update(uid, request.body);

            await this.#cache.set(`task:${uid}`, task);

            return ok(task);
        } catch (error) {
            return serverError();
        }
    }

    public async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            await this.#repository.delete(uid);

            await this.#cache.del(`task:${uid}`);

            return ok({});
        } catch (error) {
            return serverError();
        }
    }
}