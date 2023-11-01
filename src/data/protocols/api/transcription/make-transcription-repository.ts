import { MakeTranscriptionModel } from '../../../../domain/usecases/make-transcription'
import { TranscriptionModel } from '../../../../domain/model/transcription'

export interface MakeTranscriptionRepository {
  make: (transcriptionData: MakeTranscriptionModel) => Promise<TranscriptionModel>
}
