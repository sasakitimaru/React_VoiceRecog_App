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

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    };
    const formData = new FormData();
    formData.append(event);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    formData.append('language', 'en');

    try {
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers
        });
        console.log('response', response.data);

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        };
    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'An error occurred while fetching data from OpenAI API'
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        };
    }
};