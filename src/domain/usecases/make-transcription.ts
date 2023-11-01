import { TranscriptionModel } from './../model/transcription'

export interface MakeTranscriptionModel {
  youtubeUrl: string
}

export interface MakeTranscription {
  make: (makeTranscription: MakeTranscriptionModel) => Promise<TranscriptionModel>
}