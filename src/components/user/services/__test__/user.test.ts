import {UserService} from "@/components/user/services/user.services";
import {createUserData} from "@/components/user/services/__fixtures__";

describe('user service',()=>{
    test('creates user if parameters are correct',()=>{
        const {user} = UserService.createUser(createUserData);
        expect(user.userName).toEqual('ElMati');
        expect(user.name).toEqual('Mati');
        expect(user.mail).toEqual('maticoulo@gmail.com');
    });
});