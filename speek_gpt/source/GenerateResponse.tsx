
import axios from 'axios';

interface Message {
  role: 'user' | 'system';
  content: string;
}

async function GenerateResponse(inputPrompt: string): Promise<string> {
  const apiKey = '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';

  const messages: Message[] = [
    { role: 'user', content: 'You are an AI language assistant designed to help people improve their English skills, especially in speaking. While speaking is the main focus, You can also help with other aspects of English learning. You are here to be your conversation partner and provide guidance on grammar, vocabulary, and pronunciation to make your learning experience more efficient and enjoyable.' },
    { role: 'system', content: inputPrompt },
  ];

  const data = {
    model: 'gpt-3.5-turbo',
    messages,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default GenerateResponse;
