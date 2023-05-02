import { API } from 'aws-amplify';
// import { useEffect,useState } from 'react';

interface MessageForAI {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

async function GenerateResponse(messageForAI: MessageForAI[]): Promise<string> {
  // console.log('messages', messages)
  const path = '/GPTGateWay'
  const apiName = 'GPTGateWay'
  const data = {
    body: {
      messageForAI: messageForAI
    }
  }

  try {
    const response = await API.post( apiName, path, data);
    console.log('response', response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default GenerateResponse;
