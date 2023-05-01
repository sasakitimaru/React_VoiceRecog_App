import axios from 'axios';
import { useEffect,useState } from 'react';

interface MessageForAI {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

interface SetMessageForAI {
  (updater: (prevRecognigedText: MessageForAI[]) => MessageForAI[]): void;
}

async function GenerateResponse(inputPrompt: string, messageForAI: MessageForAI[], setMessageForAI: SetMessageForAI): Promise<string> {
  const apiKey = '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';
  // console.log('messageForAI: ', messageForAI);
  // console.log('messages', messages)

  const data = {
    model: 'gpt-3.5-turbo',
    messages: messageForAI,
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
