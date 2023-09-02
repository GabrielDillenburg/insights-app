import express from 'express';
import speech from '@google-cloud/speech';
import ytdl from 'ytdl-core';
import * as stream from 'stream';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const client = new speech.SpeechClient({
  version: 'v1p1beta1',
  credentials: {
    private_key: "YOUR_PRIVATE_KEY",
    client_email: "YOUR_CLIENT_EMAIL"
  }
});

app.post('/transcribe', async (req, res) => {
  try {
    const youtubeUrl = req.body.url; // Assuming you receive the YouTube URL in the request body

    // Download the YouTube video and extract audio using ytdl
    const videoInfo = await ytdl.getInfo(youtubeUrl);
    const audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });
    const audioStream = ytdl.downloadFromInfo(videoInfo, {
      format: audioFormat,
    });

    // Convert the audio stream to LINEAR16 format using fluent-ffmpeg
    const convertedAudioStream = new stream.PassThrough();
    ffmpeg()
      .input(audioStream)
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioFrequency(16000)
      .on('end', () => {
        // Send the converted audio stream to Google Cloud Speech-to-Text API for transcription
      

        client.recognize({
          audio: {
            content: convertedAudioStream.read(),
          },
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
          },
        })
          .then(([response]) => {
            const transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n');

            // Return the transcription to the client
            res.json({ transcription });
          })
          .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
          });
      })
      .pipe(convertedAudioStream, { end: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default app;
