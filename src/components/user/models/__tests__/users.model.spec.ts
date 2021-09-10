import {UserModel} from "@/components/user/models/user.model";
import {emptyUserData, shortPassword, validUserData, invalidMail,noCapsPassword,noSpecialCharPassword} from "@/components/user/models/__fixtures__";

describe('UserModel', ()=> {
    describe('schema validation', ()=> {
        it('validates required fields', ()=> {
            expect(() => {
                UserModel.fromJson(validUserData);
            }).not.toThrow();
            expect(() => {
                UserModel.fromJson(emptyUserData);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(invalidMail);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(shortPassword);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(shortPassword);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(noCapsPassword);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(noSpecialCharPassword);
            }).toThrow();
        });
        it('validates email format', () => {
            expect(() => {
                UserModel.fromJson(invalidMail);
            }).toThrow();
        });
        it('validates password format', () => {
            expect(() => {
                UserModel.fromJson(shortPassword);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(noCapsPassword);
            }).toThrow();
            expect(() => {
                UserModel.fromJson(noSpecialCharPassword);
            }).toThrow();
        });
    });
});