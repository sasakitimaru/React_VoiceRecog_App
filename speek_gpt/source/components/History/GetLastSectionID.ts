import { API, graphqlOperation } from "aws-amplify";
import { getUserSectionID } from "../../../src/graphql/queries";


function getMaxSectionID(conversations) {
    const sectionIDs = conversations.map((conversation) => parseInt(conversation.sectionID, 10)).filter((sectionID) => !isNaN(sectionID));
    const maxSectionID = Math.max(...sectionIDs);
    // console.log('sectionIDs:', sectionIDs)
    // console.log('maxSectionID:', maxSectionID)
    return maxSectionID;
}  

async function fetchLastSectionID(userId: String): Promise<number | null> {
    try {
        const { data } = await API.graphql(
            graphqlOperation(getUserSectionID, { id: userId })
        );

        const conversations = data.getUser.conversations;

        if (conversations.length === 0) {
            return null;
        }
        // Sort conversations by timestamp (descending) and get the last sectionID
        // console.log('conversations:', conversations);
        const lastSectionID = getMaxSectionID(conversations);
        // console.log('sortedLastID:', typeof lastSectionID);
        return lastSectionID;
    }catch (error) {
        console.log('error fetching last sectionID:', error);
        return null;
    }
}
export default fetchLastSectionID;