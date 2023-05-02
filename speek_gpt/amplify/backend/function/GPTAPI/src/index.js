const axios = require('axios');

/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  YOUR_API_KEY
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
  const apiKey = process.env.YOUR_API_KEY;
  const messageForAI = JSON.parse(event.body).messageForAI;

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
    console.log('response', response.data.choices[0].message.content);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].message.content),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data from OpenAI API' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
  }
};
