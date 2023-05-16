/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["tmp"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	YOUR_API_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require('axios')

exports.handler = async (event) => {
  const apiKey = process.env.YOUR_API_KEY;
  // const text = event.body.text;
  const text = typeof event.body === 'string' ? JSON.parse(event.body).text : event.body.text;
  console.log('text:',text)
  const data = {
    "model": "text-davinci-003",
    "prompt": `You are native English speaker. Make this sentence sounds more natural: ${text}`,
    "max_tokens": 60,
    "temperature": 0.9,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    // "stop": ["\n"]
};
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
    // console.log('res:',response.data.choices[0].text.trim());
    console.log(response.data.choices[0].text.trim());

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].text.trim()),
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
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