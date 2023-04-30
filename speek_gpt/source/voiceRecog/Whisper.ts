import axios from 'axios';

type WhisperProps = (text: string) => Promise<void>;

const whisper: WhisperProps = async (text) => {
    const apiKey = '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';
    let file = "tmp.wav";
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        Authorization: `Bearer ${apiKey}`
        
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper');
    formData.append('response_format', 'json');

    try {
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export default whisper;