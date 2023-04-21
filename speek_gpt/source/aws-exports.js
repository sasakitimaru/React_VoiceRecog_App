import { Amplify } from "aws-amplify";

const aws_exports = () => {
    const awsmobile = {
        aws_cognito_region: "ap-northeast-1",
        aws_user_pools_id: "ap-northeast-1_oRxQYfO3v",
        aws_user_pools_web_client_id: "2so60tk318kl6qfbtlmnl1nqkh",
    };
    Amplify.configure(awsmobile);
}

export default aws_exports;