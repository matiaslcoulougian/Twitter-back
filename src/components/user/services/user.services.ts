import {UserModel} from "@/components/user/models/user.model";

//'userName', 'name','password','mail','phone','birthDate'

export class UserService{
    public static createUser({
        name, userName,password,mail, phone, birthDate,bibliography,location,website
    }: {
        name: string;
        userName: string;
        password: string;
        mail: string;
        phone: string;
        birthDate: string;
        bibliography?: string;
        location?: string;
        website?: string;
    }) {
        return UserModel.query().insert({name,userName,password,mail, phone, birthDate,bibliography,location,website});
    }
    public static findUserById(id: string){
        return UserModel.query().findOne({id:id,isActive:true});
    }
    public static async findUserByUserName(userName: string){
        const user = await UserModel.query().findOne({userName:userName,isActive:true});
        if (!user) throw new Error('User not found');
        return user;
    }
    public static findAllUsers(){
        return UserModel.query().where('user.isActive',true);
    }
    public static async updateUser(data:Partial<UserModel>,{userName}:{userName: string}){
        const user = await this.findUserByUserName(userName);
        if (!user) throw new Error('User not found');
        return user.$query().patchAndFetch(data);
    }
    public static markAsDeleted(id: string) {
        return UserModel.query().patchAndFetchById(id, { isActive: false });
    }
}