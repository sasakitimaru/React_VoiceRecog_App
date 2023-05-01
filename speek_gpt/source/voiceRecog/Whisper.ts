import axios from 'axios';

type WhisperProps = (filePath: string) => Promise<void>;

const whisper: WhisperProps = async (filePath) => {
    const apiKey = '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';
    let file = "tmp.wav";
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    };
    const formData = new FormData();
    formData.append('file', {
        uri: filePath,
        type: 'audio/wav',
        name: 'tmp.wav',
      });
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    formData.append('language', 'en');

    try {
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, { headers });
        return response.data.text;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export default whisper;
