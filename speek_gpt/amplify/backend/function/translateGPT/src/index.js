/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	YOUR_API_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const apiKey = process.env.YOUR_API_KEY;
    const message = JSON.parse(event.body).message;
    // `Translate this into Japanese: ${message}`
  
    const data = {
      model: 'gpt-3.5-turbo',
      messages: message,
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
