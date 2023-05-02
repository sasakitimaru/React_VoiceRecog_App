import { API } from 'aws-amplify';

const CorrectGrammer = async (text: string) => {
    const path = '/correctgrammer'
    const apiName = 'GPTGateWay'
    const data = {
        body: {
            text: text
        }
    }

    try {
        const response = await API.post(apiName, path, data);
        // console.log('res:',response.data.choices[0].text.trim());
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export default CorrectGrammer;