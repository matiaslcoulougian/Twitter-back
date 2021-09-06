export const tweetSchema = {
    type: 'object',
    required: ['text'],
    properties: {
        text : {type: 'string', maxLength:240 },
    }
};