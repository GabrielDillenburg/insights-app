import { MakeTranscriptionModel, MakeTranscription, TranscriptionModel, MakeTranscriptionRepository } from './api-make-transcription-protocols'

export class ApiMakeTranscription implements MakeTranscription {
  constructor (private readonly makeTranscriptionRepository: MakeTranscriptionRepository) {}

  async make (makeTranscriptionData: MakeTranscriptionModel): Promise<TranscriptionModel> {
    const text = await this.makeTranscriptionRepository.make(Object.assign({}, makeTranscriptionData))
    return text
  }
}
