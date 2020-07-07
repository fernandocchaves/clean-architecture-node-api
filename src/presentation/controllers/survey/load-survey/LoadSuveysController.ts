import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './LoadSurveyControllerProtocols';
import { LoadSurveys } from '../../../../domain/usecases/LoadSurveys';

export class LoadSuveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load();
    return null;
  }
}
