/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	YOUR_API_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const apiKey = process.env.YOUR_API_KEY;
    const messageForAI = JSON.parse(event.body).messageForAI;
    const text = JSON.parse(event.body).text;
    const data = {
        "text": text,
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0,
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
    };

    try {
        const response = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB', data, {
            headers: headers,
            responseType: 'arraybuffer',
        });
        console.log('response', response);

        return {
            statusCode: 200,
            body: JSON.stringify(response),
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