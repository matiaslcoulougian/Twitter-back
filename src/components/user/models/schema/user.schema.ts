export const userSchema = {
    type: 'object',
    required: ['name','userName', 'password','mail','phone','birthDate'],
    properties: {
        name: {type: 'string', minLength: 3, maxLength: 15},
        userName: {type: 'string', minLength: 1, maxLength: 15},
        password: {
            type: 'string',
            minLength: 8,
            pattern:
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&._+=-])[A-Za-z0-9\\\\d@$!%*?&._+=-]{8,}$',
        },
        mail: {
            type: 'string',
            format: 'email',
        },
        phone: {type: 'integer'},
        birthDate: {type: 'string'},
    }
};
