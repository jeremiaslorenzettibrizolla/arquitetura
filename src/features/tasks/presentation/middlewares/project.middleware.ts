import { badRequest, ok } from "../../../../core/presentation";
import { HttpRequest, HttpResponse } from "../../../../core/presentation";
import { RequireFieldsValidator } from "../../../../core/presentation";
import { Project } from "../../domain/models";

export class ProjectMiddleware {
    private fields = ['name', 'userUid'];

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const body: Project = request.body;

        for (const field in this.fields) {
            const error = new RequireFieldsValidator(field).validate(body);

            if (error) {
                return badRequest(error);
            }
        }

        return ok({});
    }
}