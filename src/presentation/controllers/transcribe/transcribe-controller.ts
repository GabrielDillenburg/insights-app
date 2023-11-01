import { MakeTranscription, HttpRequest, HttpResponse, Controller, Validation } from './transcribe-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class TranscribeController implements Controller {
  constructor (private readonly makeTranscription: MakeTranscription, private readonly validation: Validation) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { youtubeUrl } = httpRequest.body
      const text = await this.makeTranscription.make({ youtubeUrl })
      return ok(text)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
