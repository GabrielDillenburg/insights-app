import OpenAI from 'openai'
import fs from 'fs'

export const OpenAIHelper = {
  openai: null as OpenAI,

  async init (): Promise<void> {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }).audio.transcriptions.create
  },

  async transcribe (audioFilePath: string, model: string): Promise<string> {
    if (!this.openai) {
      throw new Error('No instance of openAI client')
    }

    try {
      const response = await this.openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFilePath)
      })
      return response
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error.status) // e.g. 401
        console.error(error.message) // e.g. The authentication token you passed was invalid...
        console.error(error.code) // e.g. 'invalid_api_key'
        console.error(error.type) // e.g. 'invalid_request_error'
      } else {
        // Non-API error
        console.log(error)
      }
    }
  }
}
