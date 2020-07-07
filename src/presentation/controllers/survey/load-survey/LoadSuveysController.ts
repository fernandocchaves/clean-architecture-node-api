import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './LoadSurveyControllerProtocols';
import { LoadSurveys } from '../../../../domain/usecases/LoadSurveys';
import { ok, serverError } from '../../../helpers/http/HttpHelpers';

export class LoadSuveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return ok(surveys);
    } catch (error) {
      return serverError(error);
    }
  }
}
