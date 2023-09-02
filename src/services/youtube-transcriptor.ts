// import app from "../main/server";
// import ytdl from 'ytdl-core';

// import speech from '@google-cloud/speech';

// const client = new speech.SpeechClient({
//   version: 'v2beta1',
//   credentials: {
//     private_key: "API_KEY",  // Load your Google Cloud credentials as before
//   }
// });


// app.post('/transcribe', async (req, res) => {
//   try {
//     // const youtubeUrl = req.body.url; // Assuming you receive the YouTube URL in the request body

//     // // Download the YouTube video and extract audio
//     // const videoInfo = await ytdl.getInfo(youtubeUrl);
//     // const audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });
//     // const audioStream = ytdl.downloadFromInfo(videoInfo, {
//     //   format: audioFormat,
//     // });

//     // Send the audio stream to Google Cloud Speech-to-Text API for transcription
//     const [response] = await client.recognize({
//       audio: {
//         uri: 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'
//       },
//       config: {
//         encoding: 'LINEAR16', // Adjust this based on your audio format
//         languageCode: 'en-US', // Language code for transcription
//       },
//     });

//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n');

//       console.log('TRANSCRIPTION', transcription)

//     // Return the transcription to the client
//     res.json({ transcription });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

