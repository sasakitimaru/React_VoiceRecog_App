import { API } from 'aws-amplify';
// import { useEffect,useState } from 'react';

async function TranslateText(text){
  // console.log('messages', messages)
  const path = '/translategpt'
  const apiName = 'GPTGateWay'
  const data = {
    body: {
      message: [{
        role: 'user',
        content: text
      }]
    }
  }

  try {
    const response = await API.post( apiName, path, data);
    // console.log('response', response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default TranslateText;
