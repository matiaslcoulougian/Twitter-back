export const tweetSchema = {
    type: 'object',
    required: ['text','userID'],
    properties: {
        text : {type: 'string', maxLength:240 },
        userID: {type: 'string'},
    }
};