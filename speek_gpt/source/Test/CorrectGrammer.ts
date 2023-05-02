import axios from 'axios';

const CorrectGrammer = async (text: string) => {
    const apiKey = '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';
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const data = {
        "model": "text-davinci-003",
        "prompt": `Correct this to standard English: ${text}`,
        "max_tokens": 60,
        "temperature": 0.9,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        // "stop": ["\n"]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
        // console.log('res:',response.data.choices[0].text.trim());
        return response.data.choices[0].text.trim();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export default CorrectGrammer;