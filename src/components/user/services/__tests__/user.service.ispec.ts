import {UserService} from "@/components/user/services/user.services";
import {
    anotherEmail, anotherUsername,
    createUserData, createUserDataRepeatedMail, createUserDataWithInvalidMail,
    createUserDataWithNoCapsPassword,
    createUserDataWithNoSpecialCharPassword, createUserDataWithShortPassword, updateUserData
} from "@/components/user/services/__fixtures__";
import {UserModel} from "@/components/user/models/user.model";
import objectContaining = jasmine.objectContaining;
import {UniqueViolationError, ValidationError} from "objection";
import {AuthService} from "@/components/auth/services/auth.services";

//afterEach(() => jest.clearAllMocks());

describe('UserService',()=>{
    describe('create user', () => {
        it('verified there are no users', async () => {
            expect(await UserModel.query()).toHaveLength(0);
        });
        it('creates user and stores it',async()=>{
            await UserService.createUser(createUserData);
            const results = await UserModel.query();
            const userCreated = results[0];
            expect(userCreated).toEqual(objectContaining(
                {
                    id: expect.any(String),
                    userName: createUserData.userName,
                    mail: createUserData.mail,
                    birthDate: createUserData.birthDate
                }
            ));
        });
        it('throws error when creating a user with existing userName ', async function (){
            await UserService.createUser(createUserData);
            await expect(
                UserService.createUser(createUserData),
                ).rejects.toThrow(UniqueViolationError);
            expect(await UserModel.query()).toHaveLength(1);
        });
        it('throws error when creating a user with existing mail ', async function (){
            await UserService.createUser(createUserData);
            await expect(
                UserService.createUser(createUserDataRepeatedMail),
            ).rejects.toThrow(UniqueViolationError);
            expect(await UserModel.query()).toHaveLength(1);
        });
        it('throws error when creating user with invalid password', async () => {
            await expect(
                UserService.createUser(createUserDataWithNoCapsPassword),
            ).rejects.toThrow(ValidationError);
            await expect(
                UserService.createUser(createUserDataWithNoSpecialCharPassword),
            ).rejects.toThrow(ValidationError);
            await expect(
                UserService.createUser(createUserDataWithShortPassword),
            ).rejects.toThrow(ValidationError);
            expect(await UserModel.query()).toHaveLength(0);
        });
        it('throws error when creating user with invalid mail', async () => {
            await expect(
                UserService.createUser(createUserDataWithInvalidMail),
            ).rejects.toThrow(ValidationError);
            expect(await UserModel.query()).toHaveLength(0);
        });
    });

    describe('update user', () => {
        it('updates successfully', async () => {
            await UserService.createUser(createUserData);
            let results = await UserModel.query();
            const userCreated = results[0];
            expect(userCreated).toEqual(
                objectContaining({
                    id: expect.any(String),
                    userName: createUserData.userName,
                    mail: createUserData.mail,
                    birthDate: createUserData.birthDate
                }),
            );
            await UserService.updateUser(updateUserData,{userName : userCreated.userName});
            results = await UserModel.query();
            const updatedUser = results[0];
            expect(updatedUser).toEqual(
                objectContaining({
                    id: expect.any(String),
                    mail: updateUserData.mail,
                    password: expect.any(String),
                    biography: updateUserData.biography,
                    phone: updateUserData.phone,
                    name: updateUserData.name,
                    location: updateUserData.location,
                    website: updateUserData.website,
                    birthDate:updateUserData.birthDate,
                }),
            );
            expect(updatedUser.password).not.toEqual(userCreated.password);
        });
        it('updates partial data successfully', async () => {
            await UserService.createUser(createUserData);
            let results = await UserModel.query();
            const userCreated = results[0];
            expect(userCreated).toEqual(
                objectContaining({
                    id: expect.any(String),
                    userName: createUserData.userName,
                    mail: createUserData.mail,
                    birthDate: createUserData.birthDate
                }),
            );
            await UserService.updateUser({
                biography: updateUserData.biography,
                phone: updateUserData.phone,
                name: updateUserData.name,
            }, {userName : userCreated.userName});
            results = await UserModel.query();
            const firstUpdatedUser = results[0];
            expect(firstUpdatedUser).toEqual(
                objectContaining({
                    id: expect.any(String),
                    biography: updateUserData.biography,
                    phone: updateUserData.phone,
                    name: updateUserData.name,
                }),
            );
            expect(firstUpdatedUser.password).toEqual(userCreated.password);
            await UserService.updateUser({
                password: updateUserData.password,
            }, {userName : userCreated.userName});
            results = await UserModel.query();
            const secondUpdatedUser = results[0];
            expect(secondUpdatedUser.password).not.toEqual(firstUpdatedUser.password);
        });
        it('throws error when updating mail that is already in use', async () => {
            const user = await UserService.createUser(createUserData);
            await UserService.createUser({
                ...createUserData,
                userName: anotherUsername,
                mail: anotherEmail,
            });
            await expect(
                UserService.updateUser({
                    mail: anotherEmail,
                },{userName : user.userName}),
            ).rejects.toThrow(UniqueViolationError);

            const notUpdatedUser = await UserModel.query().findById(
                user.id,
            );
            expect(notUpdatedUser.mail).toEqual(createUserData.mail);
        });
        it('throws error when updating mail with invalid format', async () => {
            const user = await UserService.createUser(createUserData);
            await expect(
                UserService.updateUser({
                    mail: createUserDataWithInvalidMail.mail,
                },{userName : user.userName}),
            ).rejects.toThrow(ValidationError);
        });
        it('throws error when updating password with invalid format', async () => {
            const user = await UserService.createUser(createUserData);
            await expect(
                UserService.updateUser({password: createUserDataWithShortPassword.password},{userName : user.userName}),
            ).rejects.toThrow(ValidationError);
            await expect(
                UserService.updateUser({password: createUserDataWithNoCapsPassword.password},{userName : user.userName}),
            ).rejects.toThrow(ValidationError);
            await expect(
                UserService.updateUser(
                    {password: createUserDataWithNoSpecialCharPassword.password},{userName : user.userName}),
                ).rejects.toThrow(ValidationError);
        });
    });
    describe('delete user', () => {
        it('deletes successfully the user', async () => {
            const user = await UserService.createUser(createUserData);
            await UserService.markAsDeleted(user.id);
            const results = await UserService.findAllUsers();
            expect(results).toHaveLength(0);
            const deletedUser = await UserService.findUserById(user.id);
            expect(deletedUser).toBeUndefined();
        });
        it('returns undefined when deleting user with invalid id', async () => {
            const deletedUser = await UserService.markAsDeleted(
                '123e4567-e89b-12d3-a456-426614174000',
            );
            expect(deletedUser).toBeUndefined();
        });
        it('throws error when updating an already deleted user', async () => {
            const user = await UserService.createUser(createUserData);
            await UserService.markAsDeleted(user.id);
            await expect(
                UserService.updateUser({mail: anotherEmail},{userName : user.userName}),
            ).rejects.toThrow(Error);
        });
        it('throws error when authenticating with a deleted user', async () => {
            const user = await UserService.createUser(createUserData);
            await UserService.markAsDeleted(user.id);
            await expect(
                AuthService.authenticateUser({
                    userName: createUserData.userName,
                    password: createUserData.password,
                }),
            ).rejects.toThrow(Error);
        });
    });
});